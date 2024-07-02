const app = require("express")();
const port = process.env.PORT || 3000;
const getLocation = require("./getLocation");
const getWeather = require("./getWeather");
const geo = require("geoip-lite");

app.get("/", async function (req, res, next) {
	let visitorName = req.query.visitor_name || "visitor";
	if (req.query.name) {
		visitorName = req.query.name;
	}
	const ip = req.socket.remoteAddress;

	try {
		const locale = await getLocation(ip);

		if (!locale) {
			return res.status(404).json({ error: "Location not found from locale" });
		}

		const latitude = locale.ll[0];
		const longitude = locale.ll[1];

		let localeWeather = await getWeather(latitude, longitude);

		if (!localeWeather) {
			return res
				.status(404)
				.json({ error: "Could not get weather info from localeWather" });
		}

		if (typeof localeWeather === "string") {
			localeWeather = JSON.parse(localeWeather);
		}

		const cityName = localeWeather.name;

		res.json({
			client_ip: ip,
			location: cityName,
			greeting: `hello there ${visitorName} the temperature is ${localeWeather.main.temp} degree celsius in ${cityName}`,
		});
	} catch (error) {
		console.error("Error: ", error.message);
		res.status(500).json({ error: error.message });
	}
});

app.listen(port, function () {
	console.log(`port ${port} is active`);
});

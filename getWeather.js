const axios = require("axios");
const apiKey = "e39c21b896b978d8695516bb33410b8a";
const defaultLatitude = 9.0563;
const defaultLongitude = 7.4985;

async function getWeather(
	lat = defaultLatitude,
	lon = defaultLongitude,
	key = apiKey
) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

	try {
		const respone = await axios.get(url);
		return respone.data;
	} catch (e) {
		console.log("failed to get weather info:from weater ", e);
	}
}
module.exports = getWeather;
// const address =
// 	"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

const geo = require("geoip-lite");
function getLocation(ip) {
	const lookup = geo.lookup(ip);
	return new Promise(function (resolve, reject) {
		if (lookup) {
			resolve(lookup);
		} else {
			reject("error could not find ip from getLocation");
		}
	})
		.then(function (location) {
			return location;
		})
		.catch(function (err) {
			console.log("there was an err: ", err);
		});
}
module.exports = getLocation;

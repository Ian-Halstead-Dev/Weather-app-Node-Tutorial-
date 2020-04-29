const request = require('postman-request');
const mapboxKey = process.env.mapboxKey;

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${mapboxKey}&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services');
		}
		else if (body.features.length === 0) {
			callback('Unable to find location. Try another search');
		}
		else {
			data = body.features[0];
			callback(undefined, {
				latitude: data.center[0],
				longitude: data.center[1],
				location: data.place_name
			});
		}
	});
};

module.exports = geocode;

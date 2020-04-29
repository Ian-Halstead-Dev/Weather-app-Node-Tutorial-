const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	weatherStackKey = process.env.weatherStackKey;
	const url = `http://api.weatherstack.com/current?access_key=4f2ad4db390bd93f506e7b9264d4fbf9&query=${longitude},${latitude}&units=f`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services');
		}
		else if (body.error) {
			callback('Unable to find location');
		}
		else {
			data = body.current;
			callback(undefined, { temperature: data.temperature, feelsLike: data.feelslike });
		}
	});
};

module.exports = forecast;

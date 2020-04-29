'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Creates the app obj and it is used to setup the server
const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(publicDirPath, '/templates');
const partialsPath = path.join(viewsPath, '/partials');

//setup handelbars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');

//Setup path for partials
hbs.registerPartials(partialsPath);

// Setup static dir to serve static content (css, js, img)
app.use(express.static(publicDirPath));

//setup all routes in site
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ian Halstead'
	});
});
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Ian Halstead'
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Ian Halstead',
		helpMsg: 'I am going to be helpful'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, { temperature, feelsLike } = {}) => {
			if (error) {
				res.send({ error });
			}

			res.send({
				location,
				temperature,
				feelsLike
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}

	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404-error', {
		message: 'Error: Help article not found',
		name: 'Ian Halstead'
	});
});

//404 page
app.get('*', (req, res) => {
	res.render('404-error', {
		message: 'Error: Page not found',
		title: '404',
		name: 'Ian Halstead'
	});
});

//Run server
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

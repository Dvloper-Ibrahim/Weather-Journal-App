"use strict";
// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Require Other Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on localhost ${port}`);
});
// Making A Get Route
app.get('/getWeatherData', (req, res) => {
    res.send(projectData);
});
// Making A Post Route
app.post('/sendWeatherData', (req, res) => {
    projectData = req.body;
    res.send();
});

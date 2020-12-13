// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => console.log('server is running'));

// this will store all the input history submitted in an array in the endpoint object.
/*
const newData = [];
// get function
function funcGet(req, res) {
  newData.push(req.body);
}
projectData.weather = newData;
function sendBack(req, res) {
  res.send(projectData);
}

app.post('/', funcGet);
app.get('/newdata', sendBack);
*/

// this will store only the latest input submitted

function sendSingle(req, res) {
  projectData.Date = req.body.Date;
  projectData.Temp = req.body.Temp;
  projectData.Feeling = req.body.Feeling;
}
app.post('/', sendSingle);

function getSingle(req, res) {
  return res.send(projectData);
}
console.log(projectData);

app.get('/newdata', getSingle);

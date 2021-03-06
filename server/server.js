const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const app        = express();
const router     = express.Router();
// SERVERLESS / AWS
const serverless = require('serverless-http');
const AWS        = require('aws-sdk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { LOCATIONS_TABLE, IS_OFFLINE } = process.env;

const docClient = IS_OFFLINE ?
  new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:3000'
  }) :
  new AWS.DynamoDB.DocumentClient();

const initialLocations = [
  {
    id: 'id1',
    name: 'Denver',
    lat: 39.742043,
    lng: -104.991531,
  },
  {
    id: 'id2',
    name: 'LA',
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 'id3',
    name: 'Boston',
    lat: 42.364506,
    lng: -71.038887,
  },
];

app.locals.idIndex = 3;
app.locals.locations = initialLocations;

app.get('/', function(req, res) {
  res.send({ title: "Locations API Entry Endpoint" })
});

app.get('/locations', (req, res) => res.send({ locations: app.locals.locations }));

// app.use(express.static(path.resolve(__dirname, '..', 'build')));
//
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

// const portNumber = process.env.PORT || 3001;
//
// app.listen(portNumber, () => {
//   console.log('RrrarrrrRrrrr server alive on port 3001');
// });

module.exports.handler = serverless(app);

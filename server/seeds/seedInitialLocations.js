const AWS = require('aws-sdk');
const fs = require('fs');

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

const { IS_OFFLINE } = process.env;

const docClient =
// IS_OFFLINE ?
  new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:3001',
  })
  // : new AWS.DynamoDB.DocumentClient();

console.log("Importing initial locations into the DB...");

// if (docClient != "undefined") {
  initialLocations.forEach(function(location) {
    console.log(location);
    let { id, name, lat, lng } = location;
    let params = {
      TableName: "Locations",
      Item: {
        "id": id,
        "name": name,
        "lat": lat,
        "lng": lng
      }
    };

    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add location",
                      JSON.stringify(err, null, 2)
                    )
      } else {
        console.log("PutItem succeeded");
      }
    })

  });

// }

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:3000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Locations",
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH"
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S"
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:",
                  JSON.stringify(err, null, 2));
  } else {
    console.log("Created tabled. Table description JSON:",
                JSON.stringify(data, null, 2));
  }

})

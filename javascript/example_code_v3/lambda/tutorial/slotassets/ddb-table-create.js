/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS SDK for JavaScript,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/using-lambda-ddb-setup.html.

Purpose:
ddb-table-create.js demonstrates how to create a Amazon DynamoDB database table.

Inputs:
- REGION (into command line below)
- TABLE_NAME (into command line below)

Running the code:
node ddb-table-create.test.js REGION TABLE_NAME
*/
// snippet-start:[lambda.JavaScript.v3.CreateTable]
// Load the DynamoDB client
const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');
// Instantiate a DynamoDB client
const region = process.argv[2];
const ddb = new DynamoDBClient({region: region});
// Define the table schema
var tableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'slotPosition',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'slotPosition',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },

  TableName: process.argv[3],
  StreamSpecification: {
    StreamEnabled: false
  }
};

async function run() {
  try {
    const data = await ddb.send(new CreateTableCommand(tableParams));
    console.log('Success', data);
  } catch(err) {
    console.log('Error', err);
  }
}

run();
// snippet-end:[lambda.JavaScript.v3.CreateTable]
exports.run = run; //for unit tests only

/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS SDK for JavaScript,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/sqs-examples-enable-long-polling.html.

Purpose:
sqs_longpolling_createqueue.test.js demonstrates how to create an Amazon SQS queue that waits for a message to arrive.

Inputs:
- REGION (into command line below)
- SQS_QUEUE_NAME (into command line below)

Running the code:
node sqs_longpolling_createqueue.js REGION SQS_QUEUE_NAME
*/
// snippet-start:[sqs.JavaScript.v3.longPoll.createQueue]
// Import required AWS SDK clients and commands for Node.js
const {SQS, CreateQueueCommand} = require("@aws-sdk/client-sqs");
// Set the AWS Region
const region = process.argv[2];
// Create SQS service object
const sqs = new SQS(region);
// Set the parameters
const params =  {
  QueueName: process.argv[3], //SQS_QUEUE_NAME
  Attributes: {
    'ReceiveMessageWaitTimeSeconds': '20',
  }
};
async function run() {
  try {
    const data = await sqs.send(new CreateQueueCommand(params));
    console.log("Success, new SQS queue created. SQS queue URL:", data.QueueUrl);
  } catch (err) {
    console.error(err, err.stack);
  }
};
run();
// snippet-end:[sqs.JavaScript.v3.longPoll.createQueue]
exports.run = run; //for unit tests only

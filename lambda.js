//This script is for uploading on Lambda page, don't run node lambda.js

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({
  region: 'sa-east-1' 
});

exports.handler = async (event, context) => {
  const message = JSON.parse(event.Records[0].body);

  console.log(message)

  const params = {
    TableName: 'transactions',
    Item: {
      idempotencyId: {
        S:message.idempotencyId
      },
      amount: {
        N:message.amount.toString()
      },
      type: {
        S:message.type
      },

    }
  };

  await dynamodb.putItem(params).promise();

  console.log('Transação salva no DynamoDB!');
};
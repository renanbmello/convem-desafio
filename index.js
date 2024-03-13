const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json())
const sqs = new AWS.SQS({
  region: 'sa-east-1' 
});


app.post('/transacoes', async (req, res) => {
  try {const body = req.body;
    console.log(body)
  const params = {
    QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/637423357477/transactions', 
    MessageBody: JSON.stringify(body)
  };
  console.log(params)
  await sqs.sendMessage(params).promise();

  res.send('Transação enviada para a fila SQS!');
    }catch(error){
        res.send(error)
        console.log(error)
    }
});

app.listen(3000, () => {
  console.log('API ouvindo na porta 3000');
});
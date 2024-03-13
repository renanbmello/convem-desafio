const axios = require('axios');

const url = 'http://localhost:3000/transacoes';

for (let i = 0; i < 100; i++) {
  const body = {
    idempotencyId: `id-${i}`,
    amount: Math.random() * 100,
    type: Math.random() > 0.5 ? 'credit' : 'debit'
  };

  axios.post(url, body);
}
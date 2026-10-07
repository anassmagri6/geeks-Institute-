const express = require('express');
const app = express();
const Rouuter = require('./routes/quiz');

app.use(express.json());

app.use('/quiz', Rouuter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
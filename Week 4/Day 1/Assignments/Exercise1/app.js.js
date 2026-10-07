         //🌟Exercise 1: Creating a Simple Express.js Application with Routes
const express = require('express');
const app = express();
const getrouter = require('./routes/index');

app.use('/', getrouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

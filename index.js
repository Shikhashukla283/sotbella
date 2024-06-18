const express = require('express');
const app = express();
require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;
require('dotenv').config();
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('Hi Sotbella!');
});

require('./routes/index')(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port} and host ${host}`)
});

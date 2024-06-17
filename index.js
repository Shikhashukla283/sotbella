const express = require('express');
const app = express();
const port = 8081;
require('dotenv').config();
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('Hi Sotbella!');
});

require('./routes/index')(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

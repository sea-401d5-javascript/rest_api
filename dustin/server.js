'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonPaser = bodyParser.json();
const routes = require('./routes/index');
const companies = require('./routes/companies');
const sharks = require('./routes/sharks');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require('./lib/errorhandler');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

if (!(process.env.NODE_ENV === 'TEST')) app.use(morgan('dev'));

app.use(jsonPaser);

app.use('/', routes);
app.use('/companies', companies);
app.use('/sharks', sharks);

app.get('/*', (req, res) => {
  res.status(404).json({
    Error: 'Not Found'
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  if (!(process.env.NODE_ENV === 'TEST')) console.log('up on 3000');
});

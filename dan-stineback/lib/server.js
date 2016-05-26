'use strict';

const express = require('express');
const router = require(__dirname + ('/server'));
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dogRouter = require('../routes/dog-route');
const catRouter = require('../routes/cat-route');

app.use(morgan('dev'));
mongoose.connect('mongodb://localhost/dev_db');
app.use('/dogs', dogRouter);
app.use('/cats', catRouter);

app.get('/*', (req, res) => {
  res.status(404).json({message: 'not found'});
});
app.listen(3000, () => console.log('server is up on 3000'));

'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

const dogRouter = require(__dirname + '/routes/dog-route');
const catRouter = require(__dirname + '/routes/cat-route');
const authRouter = require(__dirname + '/routes/router');

app.use(morgan('dev'));
app.use('/dogs', dogRouter);
app.use('/cats', catRouter);
app.use('/', authRouter);

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
  next(err);
});

app.use((req, res)=> {
  res.status(404).json({message: 'not found'});
});
app.listen(3000, () => console.log('server is up on 3000'));

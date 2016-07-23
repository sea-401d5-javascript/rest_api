'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require('./lib/error_handling');
const cors = require('cors');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

const authRouter = require('./routes/auth_routes');
const iceCreamRouter = require('./routes/icecream_routes');
const milkShakeRouter = require('./routes/milkshake_routes');

app.use(cors());

app.use(morgan('dev'));
app.use('/', authRouter);
app.use('/icecream', iceCreamRouter);
app.use('/milkshake', milkShakeRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});


app.listen(3000, () => {
  console.log('up on 3000');
});

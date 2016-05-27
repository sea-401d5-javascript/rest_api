'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler =require('./lib/error_handling');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/dev_db');

const manUnitedRouter = require('./routes/man_united_routes');
const barcaRouter = require('./routes/barca_routes');
const compareRouter = require('./routes/compare_route');

app.use('/manUnited', manUnitedRouter);
app.use('/barca', barcaRouter);
app.use('/compare', compareRouter);

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});

app.use(errorHandler);

app.listen(6969, () => console.log('up on 6969 baby, server way up'));

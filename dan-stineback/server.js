'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require(__dirname + '/lib/error_handling');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect('mongodb://localhost/dev_db');

const dogRouter = require(__dirname + '/routes/dog-route');
const catRouter = require(__dirname + '/routes/cat-route');

app.use(morgan('dev'));
app.use(__dirname + '/dogs', dogRouter);
app.use(__dirname + '/cats', catRouter);

app.use(errorHandler);


app.listen(3000, () => console.log('server is up on 3000'));

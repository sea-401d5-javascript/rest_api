'use strict';

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const errorHandle = require(__dirname + '/lib/err_handler');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/marvel_app_dev';

mongoose.connect(dbPort);

const marvelRouter = require(__dirname + '/routes/marvel_routes');
const dcRouter = require(__dirname + '/routes/dc_routes');
const duelRouter = require(__dirname + '/routes/duel_routes');

app.use('/api', marvelRouter, dcRouter, duelRouter);

app.use(errorHandle);

app.use((err, res) => {
  res.status(404).json({ message: err.message });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));

'use strict';
const app = require('express')();
const mongoose = require('mongoose');
const Router = require('./route/routes');
const bodyParser = require('body-parser').json();
const jwt = require('./lib/jwt');
const errorHandler = require('./lib/error-handler');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect('mongodb://localhost/dev_db');

const playerRouter = require('./routes/player-routes');

app.use('/', Router);
app.use('/nbaPlayers', playerRouter);
app.use('/nflPlayers', playerRouter);

app.get('/test', (req, res) => {
  res.send('no token required');
});

app.post('/test', bodyParser, jwt, (req, res) => {
  res.json({message:'token required', user: req.user});
});

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});

app.listen(3000, () => console.log('up on 3000'));

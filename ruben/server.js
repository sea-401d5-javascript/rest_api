'use strict';

const express = require('express');
const mongoose = require('mongoose');
const nbaRouter = require('./routes/nba-router');
const nflRouter = require('./routes/nfl-router');
const userRouter = require('./routes/user-routes.js');
const app = express();

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect('mongodb://localhost/dev_db');

app.use('/', userRouter);
app.use('/nbaPlayers', nbaRouter);
app.use('/nflPlayers', nflRouter);

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});

app.get('/*', (req, res)=>{
  res.status(404).json({message:'not found'});
});

app.listen(3000, () => console.log('up on 3000'));

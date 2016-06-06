'use strict';

const express = require('express');
const mongoose = require('mongoose');
const snakeRouter = require(__dirname + '/routes/snakeRouter.js');
const weaselRouter = require(__dirname + '/routes/weaselRouter.js');
const battleRouter = require(__dirname + '/routes/battleRouter.js');
const authRouter = require(__dirname + '/routes/auth_routes');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dev_db');

app.use('/snakes', snakeRouter);
app.use('/weasels', weaselRouter);
app.use('/battle', battleRouter);
app.use('/', authRouter);

app.use((err, req, res, next)=>{
  res.status(500).json({message:err.message});
  next(err);
});

app.get('/*', (req, res)=>{
  res.status(404).json({message:'not found'});
});

app.listen(process.env.PORT || 2222, ()=>{
  console.log('Server up on ' + process.env.PORT || 'quadruple-deuce!');
});

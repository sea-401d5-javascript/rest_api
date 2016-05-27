'use strict';

const express = require('express');
const mongoose = require('mongoose');
const snakeRouter = require(__dirname + '/routes/snakeRouter.js');
const weaselRouter = require(__dirname + '/routes/weaselRouter.js');
const battleRouter = require(__dirname + '/routes/battleRouter.js');
const app = express();

mongoose.connect('mongodb://localhost/dev_db');

app.use('/snakes', snakeRouter);
app.use('/weasels', weaselRouter);
app.use('/battle', battleRouter);

app.get('/*', (req, res)=>{
  res.status(404).json({message:'not found'});
});

app.listen(2222, ()=>{console.log('Server up on quadruple-deuce!')});

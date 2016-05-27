/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

const cookieRouter = require('./routes/cookieRouter.js');
const candyRouter = require('./routes/candyRouter.js');

app.use('/cookies', cookieRouter);
app.use('/candy', candyRouter);


app.use((err,req,res,next)=> {
  res.status(500).json({message: err.message});
});

app.listen(3000,()=> console.log('Treats up on port 3000'));

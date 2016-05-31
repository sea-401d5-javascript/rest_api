'use strict'
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const frenchieRouter = require('./routes/frenchieRouter.js')
const dogWalkerRouter = require('./routes/dogWalkerRouter.js')
const mixedRouter = require('./routes/mixedRouter.js')
const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);


app.use('/frenchie', frenchieRouter)
app.use('/dogwalkers', dogWalkerRouter)
app.use('/unfortunate', mixedRouter)
app.use((err,req,res,next) => {
  res.status(404).json({message:err.message})
})
app.listen(3000, () => console.log('listening on 3000'))

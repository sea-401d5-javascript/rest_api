'use strict'

const express = require('express')
const bodyParser = require('body-parser').json
const Frenchie = require('../schema/frenchies.js')
const Dogwalkers = require('../schema/dogWalkers.js')

const mixedRouter = module.exports = express.Router()

mixedRouter.get('/', (req,res,next) => {
  let dogWalkers_bitten;
  let dogs_died;
  Frenchie.aggregate([

  {
    '$group':{
      '_id':null,
      'total_bitten':{'$sum': '$dogWalkers_bitten'}
    }
  }
], (err,frenchie) => {
    if(err) return next(err)
    dogWalkers_bitten = frenchie[0].total_bitten

  })

  Dogwalkers.aggregate([
    {
      '$group':{
        '_id':null,
        'dogs_died':{'$sum':'$dogs_died'}
      }
    }
  ], (err,dogwalkers) => {
    if(err) return next(err)
    dogs_died = dogwalkers[0].dogs_died

  })
var message = `${dogWalkers_bitten > dogs_died ? 'A dogwalker': 'A dog'} has died`
res.json(message)
})

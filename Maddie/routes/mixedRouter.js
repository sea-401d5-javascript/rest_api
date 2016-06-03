'use strict';

const express = require('express');
const Frenchie = require('../schema/frenchies.js');
const Dogwalkers = require('../schema/dogWalkers.js');

const mixedRouter = module.exports = express.Router();

mixedRouter.get('/', (req,res,next) => {
  let dogWalkers_bitten;
  let dogs_died;
  let queryDogW = Dogwalkers.aggregate([
    {
      '$group':{
        '_id':null,
        'dogs_died':{'$sum':'$dogs_died'}
      }
    }
  ]).exec();

  let query = Frenchie.aggregate([
    {
      '$group':{
        '_id':null,
        'total_bitten':{'$sum': '$dogWalkers_bitten'}
      }
    }
  ]).exec();
  query.then((data) => {
    dogWalkers_bitten = data[0].total_bitten;
    console.log('inside promise', dogWalkers_bitten);
    return queryDogW;
  })
  .then((data) => {
    dogs_died = data[0].dogs_died;
    console.log('inside promise', dogs_died);
    var message = `${dogWalkers_bitten > dogs_died ? 'A dogwalker': 'A dog'} has died`;
    res.json(message);
  })
  .catch((err) => {
    return next(err);
  });
   
});

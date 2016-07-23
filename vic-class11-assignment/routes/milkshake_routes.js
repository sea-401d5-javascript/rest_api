'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const MilkShake = require('../model/milkshake');
const jwt = require('../lib/jwt_auth');

const milkShakeRouter = module.exports = exports = express.Router();

milkShakeRouter.get('/', (req, res, next) => {
  MilkShake.find({}, (err, milkshakes) => {
    console.log('not getting', milkshakes);
    if(err) return next(err);
    res.json(milkshakes);
  });
});

milkShakeRouter.post('/', jwt, jsonParser, (req, res, next) => {
  let newMilkshake = new MilkShake(req.body);
  newMilkshake.save((err, milkshake) => {
    if(err) return next(err);
    res.json(milkshake);
  });
});

milkShakeRouter.put('/:id', jwt, jsonParser, (req, res, next) => {
  let _id = req.params.id;
  MilkShake.findOneAndUpdate({_id}, req.body, (err) => {
    if(err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

milkShakeRouter.delete('/:id', jwt, (req, res, next) => {
  let _id = req.params.id;
  MilkShake.findOneAndRemove({_id}, (err) => {
    if(err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

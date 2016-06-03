'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const DogWalker = require('../schema/dogWalkers.js');
const verifyToken = require('../lib/auth_token.js');

const dogWalkerRouter = module.exports = express.Router();

dogWalkerRouter.post('/', verifyToken, jsonParser, (req,res,next) => {
  let newDogWalker = new DogWalker(req.body);
  newDogWalker.save((err,dogwalkers) => {
    if (err) return next(err);
    res.json(dogwalkers);
  });
});

dogWalkerRouter.get('/', (req,res,next) => {
  DogWalker.find({}, (err, dogwalkers) => {
    if(err) return next(err);
    res.json(dogwalkers);
  });
});



dogWalkerRouter.put('/', verifyToken, jsonParser, (req,res,next) => {
  DogWalker.findOneAndUpdate({_id:req.body._id}, req.body, (err,dogwalkers) => {
    if(err) return next(err);
    console.log(dogwalkers);
    res.json({message: 'you have successfully updated the dogwalkers'});
  });
});

dogWalkerRouter.delete('/:id', verifyToken, (req,res,next) => {
  DogWalker.findOneAndRemove({_id:req.params.id}, null, (err,dogwalkers) => {
    if(err) return next(err);
    res.json({message: 'Successfully deleted a dogwalker', data:dogwalkers});
  });
});

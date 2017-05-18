'use strict';
const express = require('express');
const Dog = require('../model/dogs');
const bodyParser = require('body-parser').json();
const jwtAuth = require('../lib/jwt_auth');

const dogRouter = module.exports = exports = express.Router();


dogRouter.get('/', (req, res, next) => {
  Dog.find({}, (err, dog) => {
    if(err) return next(err);
    res.json(dog);
  });
});

dogRouter.post('/', bodyParser, jwtAuth, (req, res, next) => {
  let newDog = new Dog(req.body);
  newDog.save((err, dog)=> {
    if (err) return next(err);
    res.json(dog);
  });
});

dogRouter.put('/', bodyParser, jwtAuth, (req, res, next) => {
  let _id = req.body._id;
  Dog.findOneAndUpdate({_id}, req.body, (err, dog) =>{
    if (err) return next(err);
    res.json({message: 'successfully updated', data: dog});
  });
});

dogRouter.delete('/:id', jwtAuth, (req, res, next) => {
  let _id = req.params.id;
  Dog.findOneAndRemove({_id}, null, (err, dog) => {
    if (err) return next(err);
    res.json({message: 'successfully deleted', data: dog});
  });
});

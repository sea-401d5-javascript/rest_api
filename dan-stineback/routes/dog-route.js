'use strict';
const express = require('express');
const Dog = require('../schema/dogs');
const bodyParser = require('body-parser').json();
const jsonParser = bodyParser;

const dogRouter = module.exports = exports = express.Router();


dogRouter.get('/', (req, res, next) => {
  Dog.find({}, (err, dog) => {
    if(err) return next(err);
    res.json(dog);
  });
});

dogRouter.post('/', bodyParser, (req, res, next) => {
  let newDog = new Dog(req.body);
  newDog.save((err, dog)=> {
    if (err) return next(err);
    res.json(dog);
  });
});

dogRouter.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  Dog.findOneAndUpdate({_id}, req.body, (err, dog) =>{
    if (err) return next(err);
    let message = "successfully updated";
    res.json({message});
  });
});

dogRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Dog.findOneAndRemove({_id}, null, (err, dog) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

'use strict';
const express = require('express');
const Cat = require('../schema/cats');
const Dog = require('../schema/dogs');
const bodyParser = require('body-parser').json();
const jsonParser = bodyParser;

const ageRouter = module.exports = exports = express.Router();

ageRouter.get('/', (req, res, next) =>{
  Cat.find({}, (err, cat)=>{
    if(err) return next(err);
    res.json(cat);
  });
});

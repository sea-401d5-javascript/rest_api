'use strict';
const express = require('express');
const Cat = require('../schema/cats');
const bodyParser = require('body-parser').json();
const jsonParser = bodyParser;

const catRouter = module.exports = exports = express.Router();


catRouter.get('/cats/', (req, res, next) => {
  Cat.find({}, (err, cat) => {
    if(err) return next(err);
    res.json(cat);
  });
});

catRouter.post('/cats/', bodyParser, (req, res, next) => {
  let newCat = new Cat(req.body);
  newCat.save((err, cat)=> {
    if (err) return next(err);
    res.json(cat);
  });
});

catRouter.put('/cats/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  Cat.findOneAndUpdate({_id}, req.body, (err, cat) =>{
    if (err) return next(err);
    let message = "successfully updated";
    res.json({message});
  });
});

catRouter.delete('/cats/:id', (req, res, next) => {
  let _id = req.params.id;
  Cat.findOneAndRemove({_id}, null, (err, cat) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

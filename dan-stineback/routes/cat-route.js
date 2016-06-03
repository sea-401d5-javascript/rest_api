'use strict';
const express = require('express');
const Cat = require('../model/cats');
const bodyParser = require('body-parser').json();


const catRouter = module.exports = exports = express.Router();


catRouter.get('/', (req, res, next) => {
  Cat.find({}, (err, cat) => {
    if(err) return next(err);
    res.json(cat);
  });
});

catRouter.post('/', bodyParser, (req, res, next) => {
  let newCat = new Cat(req.body);
  newCat.save((err, cat)=> {
    if (err) return next(err);
    res.json(cat);
  });
});

catRouter.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  Cat.findOneAndUpdate({_id}, req.body, (err, cat) =>{
    if (err) return next(err);
    res.json({message:'successfully updated', data: cat});
  });
});

catRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Cat.findOneAndRemove({_id}, null, (err, cat) => {
    if (err) return next(err);
    res.json({message: 'successfully deleted', data: cat});
  });
});

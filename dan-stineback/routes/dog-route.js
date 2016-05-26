'use strict';
const express = require('express');
const Dog = require('../schema/dogs');
const bodyParser = require('body-parser').json();
const jsonParser = bodyParser;
const dogRouter = module.exports = exports = express.Router();


dogRouter.get('/dogs', (req, res) => {
  Dog.find({}, (err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  })
});

dogRouter.post('/dogs', jsonParser, (req, res) => {
  let newDog = new Dog(req.body);
  newDog.save((err, data)=> {
    if (err) return res.json({message: err.message});
    res.json(data);
  })
});

dogRouter.put('/dogs', jsonParser, (req, res) => {
  Dog.findOneAndUpdate({_id: req.body._id}, req.body, (err, data) =>{
    if (err) return res.json({message: err.message});
    res.send(data);
  });
});

dogRouter.delete('/dogs/:id', (req, res) => {
  let _id = req.params.id;
  Dog.findOneAndRemove({_id}, null, (err, data) => {
    if (err) return res.json({message: err.message});
    res.send('deleted dog with id: ' + req.params.id);
  });
});

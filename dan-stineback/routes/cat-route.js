'use strict';
const express = require('express');
const Cat = require('../schema/cats');
const bodyParser = require('body-parser').json();
const jsonParser = bodyParser;
const catRouter = module.exports = exports = express.Router();


catRouter.get('/cats', (req, res) => {
  Cat.find({}, (err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

catRouter.post('/cats', (req, res) => {
  let newCat = new Cat(req.body);
  newCat.save((err, data)=> {
    if (err) return res.json({message: err.message});
    res.json(data);
  });
});

catRouter.put('/cats', (req, res) => {
  Cat.findOneAndUpdate({_id: req.body._id}, req.body, (err, data) =>{
    if (err) return res.json({message: err.message});
    res.send(data);
  });
});

catRouter.delete('/cats/:id', (req, res) => {
  let _id = req.params.id;
  Cat.findOneAndRemove({_id}, null, (err, data) => {
    if (err) return res.json({message: err.message});
    res.send('deleted cat with id: ' + req.params.id);
  });
});

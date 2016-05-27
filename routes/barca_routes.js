'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const BarcaPlayer = require('../schema/barca_Player');

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
  BarcaPlayer.find({}, (err, data) => {
    if(err) return next(err);
    res.json(data);
  });
});

router.post('/', bodyParser, (req, res, next) => {
  let newBarcaPlayer = new BarcaPlayer(req.body);
  newBarcaPlayer.save((err, data) => {
    if(err) return next(err);
    res.json(data);
  });
});

router.put('/', bodyParser, (req, res, next) => {
  let _id = req.body.id;
  BarcaPlayer.findOneAndUpdate({_id}, req.body, (err, data) => {
    if(err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.delete('/:id', bodyParser, (req, res, next) => {
  let _id = req.params.id;
  BarcaPlayer.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

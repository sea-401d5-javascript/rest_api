'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const BarcaPlayer = require('../schema/barca_Player');

const router = module.exports = exports = express.Router();

router.get('/', (req, res) => {
  BarcaPlayer.find({}, (err, data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

router.post('/', bodyParser, (req, res) => {
  let newBarcaPlayer = new BarcaPlayer(req.body);
  newBarcaPlayer.save((err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

router.put('/', bodyParser, (req, res) => {
  BarcaPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

router.delete('/:id', bodyParser, (req, res) => {
  let _id = req.params.id;
  BarcaPlayer.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return res.json({message: err.message});
    res.send('deleted Barca Player with id ' + req.params.id);
  });
});

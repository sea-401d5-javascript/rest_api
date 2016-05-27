'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const NbaPlayer = require('../schema/nba')
const NflPlayer = require('../schema/nfl')

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
  NbaPlayer.find({}, (err, nbaPlayers) => {
      if (err) return next(err);
      res.json(nbaPlayers);
  });
});

router.post('/', bodyParser, (req, res, next) => {
  let newNbaPlayer = new NbaPlayer(req.body);
  newNbaPlayer.save((err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  NbaPlayer.findOneAndUpdate({_id}, req.body, (err, nbaPlayers) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  NbaPlayer.findOneAndRemove({_id}, (err, nbaPlayers) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

router.average('/average-height', (req, res, next) => {
  NbaPlayer.find({}, (err, nbaPlayers) => {
      if (err) return next(err);
      res.json(nbaPlayers);
  });
});

router.get('/', (req, res, next) => {
  NflPlayer.find({}, (err, nflPlayers) => {
      if (err) return next(err);
      res.json(nflPlayers);
  });
});

router.post('/', bodyParser, (req, res, next) => {
  let newNflPlayer = new NflPlayer(req.body);
  newNflPlayer.save((err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  NflPlayer.findOneAndUpdate({_id}, req.body, (err, nflPlayers) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  NflPlayer.findOneAndRemove({_id}, (err, nflPlayers) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

router.average('/average-weight', (req, res, next) => {
  NflPlayer.find({}, (err, nflPlayers) => {
      if (err) return next(err);
      res.json(nflPlayers);
  });
});

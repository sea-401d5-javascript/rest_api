'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const NflPlayer = require('../model/nfl');

const nflRouter = module.exports = exports = express.Router();

nflRouter.get('/', (req, res, next) => {
  NflPlayer.find({}, (err, nflPlayers) => {
      if (err) return next(err);
      res.json(nflPlayers);
  });
});

nflRouter.post('/', bodyParser, (req, res, next) => {
  let newNflPlayer = new NflPlayer(req.body);
  newNflPlayer.save((err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

nflRouter.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  NflPlayer.findOneAndUpdate({_id}, req.body, (err, nflPlayers) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

nflRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  NflPlayer.findOneAndRemove({_id}, (err, nflPlayers) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

nflRouter.get('/average-weight', (req, res, next) => {
  NflPlayer.aggregate({
    '$group': {
      '_id': null,
      'avgWeight': {'$avg': '$weight'}
    }
  }, (err, nflPlayers) => {
    if (err) return next (err);
    res.json(nflPlayers[0]);
  });
});

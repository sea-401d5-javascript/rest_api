'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const NbaPlayer = require('../model/nba');


const nbaRouter = module.exports = exports = express.Router();

nbaRouter.get('/', (req, res, next) => {
  NbaPlayer.find({}, (err, nbaPlayers) => {
      if (err) return next(err);
      res.json(nbaPlayers);
  });
});

nbaRouter.post('/', bodyParser, (req, res, next) => {
  let newNbaPlayer = new NbaPlayer(req.body);
  newNbaPlayer.save((err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

nbaRouter.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  NbaPlayer.findOneAndUpdate({_id}, req.body, (err, nbaPlayers) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

nbaRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  NbaPlayer.findOneAndRemove({_id}, (err, nbaPlayers) => {
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

nbaRouter.get('/average-height', (req, res, next) => {
  NbaPlayer.aggregate({
    '$group': {
      '_id': null,
      'avgHeight': {'$avg': '$height'}
    }
  }, (err, nbaPlayers) => {
    if (err) return next (err);
    res.json(nbaPlayers[0]);
  });
});

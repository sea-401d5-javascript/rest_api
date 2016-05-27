'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const ManUnitedPlayer = require('./schema/man_United_Player');
const BarcaPlayer = require('./schema/barca_Player');
const manUnitedRouter = express.Router();
const barcaRouter = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/dev_db');

manUnitedRouter.use(jsonParser);
barcaRouter.use(jsonParser);

app.use('/manUnited', manUnitedRouter);
app.use('/barca', barcaRouter);

manUnitedRouter.get('/', (req, res) => {
  ManUnitedPlayer.find({}, (err,data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

manUnitedRouter.post('/', jsonParser,  (req, res) => {
  let newManUnitedPlayer = new ManUnitedPlayer(req.body);
  newManUnitedPlayer.save((err, data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

manUnitedRouter.put('/', jsonParser, (req, res) => {
  ManUnitedPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err,data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

manUnitedRouter.delete('/:id', jsonParser, (req, res) => {
  let _id = req.params.id;
  ManUnitedPlayer.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return res.json({message: err.message});
    res.send('deleted Man United Player with id ' + req.params.id);
  });
});

barcaRouter.get('/', (req, res) => {
  BarcaPlayer.find({}, (err, data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

barcaRouter.post('/', jsonParser, (req, res) => {
  let newBarcaPlayer = new BarcaPlayer(req.body);
  newBarcaPlayer.save((err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

barcaRouter.put('/', jsonParser, (req, res) => {
  BarcaPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err, data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

barcaRouter.delete('/:id', jsonParser, (req, res) => {
  let _id = req.params.id;
  BarcaPlayer.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return res.json({message: err.message});
    res.send('deleted Barca Player with id ' + req.params.id);
  });
});

manUnitedRouter.get('/mostGoals', (req, res, next) => {
  // ManUnitedPlayer.find({}, (err, player)=>{
  //   if (err) return next(err);
  //   console.log(player);
  //   var totalManUGoalsScored = player.reduce((acc, player) => {
  //     return acc += player.goals;
  //
  //   }, 0);
  //   console.log(totalManUGoalsScored);
  //   res.json(totalManUGoalsScored);
  // });
  BarcaPlayer.find({}, (err, player)=>{
    if (err) return next(err);
    console.log(player);
    var totalBarcaGoalsScored = player.reduce((acc, player) => {
      return acc += player.goals;

    }, 0);
    console.log(totalBarcaGoalsScored);
    res.json(totalBarcaGoalsScored);
  });
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
});

app.listen(6969, () => console.log('up on 6969 baby, server way up'));

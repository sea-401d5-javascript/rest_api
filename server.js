'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler =require('./lib/error_handling');
// const bodyParser = require('body-parser').json();
// const ManUnitedPlayer = require('./schema/man_United_Player');
// const BarcaPlayer = require('./schema/barca_Player');
// const manUnitedRouter = express.Router();
// const barcaRouter = express.Router();
const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/dev_db');

const manUnitedRouter = require('./routes/man_united_routes');
const barcaRouter = require('./routes/barca_routes');
const compareRouter = require('./routes/compare_route');

// manUnitedRouter.use(bodyParser);
// barcaRouter.use(bodyParser);

app.use('/manUnited', manUnitedRouter);
app.use('/barca', barcaRouter);
app.use('/compare', compareRouter);

// manUnitedRouter.get('/', (req, res) => {
//   ManUnitedPlayer.find({}, (err,data) => {
//     if(err) return res.json({
//       message: err.message
//     });
//     res.json(data);
//   });
// });
//
// manUnitedRouter.post('/', bodyParser,  (req, res) => {
//   let newManUnitedPlayer = new ManUnitedPlayer(req.body);
//   newManUnitedPlayer.save((err, data) => {
//     if(err) return res.json({
//       message: err.message
//     });
//     res.json(data);
//   });
// });
//
// manUnitedRouter.put('/', bodyParser, (req, res) => {
//   ManUnitedPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err,data) => {
//     if(err) return res.json({message: err.message});
//     res.json(data);
//   });
// });
//
// manUnitedRouter.delete('/:id', bodyParser, (req, res) => {
//   let _id = req.params.id;
//   ManUnitedPlayer.findOneAndRemove({_id}, null, (err,data) => {
//     if(err) return res.json({message: err.message});
//     res.send('deleted Man United Player with id ' + req.params.id);
//   });
// });

// barcaRouter.get('/', (req, res) => {
//   BarcaPlayer.find({}, (err, data) => {
//     if(err) return res.json({
//       message: err.message
//     });
//     res.json(data);
//   });
// });
//
// barcaRouter.post('/', bodyParser, (req, res) => {
//   let newBarcaPlayer = new BarcaPlayer(req.body);
//   newBarcaPlayer.save((err, data) => {
//     if(err) return res.json({message: err.message});
//     res.json(data);
//   });
// });
//
// barcaRouter.put('/', bodyParser, (req, res) => {
//   BarcaPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err, data) => {
//     if(err) return res.json({message: err.message});
//     res.json(data);
//   });
// });
//
// barcaRouter.delete('/:id', bodyParser, (req, res) => {
//   let _id = req.params.id;
//   BarcaPlayer.findOneAndRemove({_id}, null, (err,data) => {
//     if(err) return res.json({message: err.message});
//     res.send('deleted Barca Player with id ' + req.params.id);
//   });
// });

// manUnitedRouter.get('/mostGoals', (req, res, next) => {
//     let teamGoalArray = [];
//
//   ManUnitedPlayer.find({}, (err, player)=>{
//     if (err) return next(err);
//     let totalManUGoalsScored = player.reduce((acc, player) => {
//       return acc += player.goals;
//     }, 0);
//     teamGoalArray.push(totalManUGoalsScored);
//     console.log(teamGoalArray);
//   });
//   BarcaPlayer.find({}, (err, player)=>{
//     if (err) return next(err);
//     let totalBarcaGoalsScored = player.reduce((acc, player) => {
//       return acc += player.goals;
//     }, 0);
//     console.log(totalBarcaGoalsScored);
//     teamGoalArray.push(totalBarcaGoalsScored);
//
//     if (teamGoalArray[1] > teamGoalArray[0]) {
//       res.json("Barcalona players scored " + teamGoalArray[1] + " goals, which is more than Man United Players.")
//     } else if (teamGoalArray[1] < teamGoalArray[0]) {
//       res.json("Man United players scored " + teamGoalArray[0] + " goals, which is more than Barcalona Players.")
//     } else {
//       res.json("They scored the same amount.")
//     }
//   });
//
// });

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});

app.use(errorHandler);

app.listen(6969, () => console.log('up on 6969 baby, server way up'));

'use strict';

const express = require('express');
const BarcaPlayer = require('../schema/barca_Player');
const ManUnitedPlayer = require('../schema/man_United_Player');

const router = module.exports = exports = express.Router();

router.get('/mostGoals', (req, res, next) => {
  let teamGoalArray = [];

  ManUnitedPlayer.find({}, (err, player)=>{
    if (err) return next(err);
    let totalManUGoalsScored = player.reduce((acc, player) => {
      return acc += player.goals;
    }, 0);
    console.log(totalManUGoalsScored);
    teamGoalArray.push(totalManUGoalsScored);
  });
  BarcaPlayer.find({}, (err, player)=>{
    if (err) return next(err);
    let totalBarcaGoalsScored = player.reduce((acc, player) => {
      return acc += player.goals;
    }, 0);
    teamGoalArray.push(totalBarcaGoalsScored);

    if (teamGoalArray[1] > teamGoalArray[0]) {
      res.json('Barcalona players scored ' + teamGoalArray[1] + ' goals, which is more than Man United Players.');
    } else if (teamGoalArray[1] < teamGoalArray[0]) {
      res.json('Man United players scored ' + teamGoalArray[0] + ' goals, which is more than Barcalona Players.');
    } else {
      res.json('They scored the same amount.');
    }
  });

});

'use strict';

const express = require('express');
const Snake = require(__dirname + '/../../schema/snake');
const Weasel = require(__dirname + '/../../schema/weasel');
const bodyParser = require('body-parser').json();

const battleRouter = module.exports = exports = express.Router();

battleRouter.get('/', (req, res)=>{
  let snakeCount,
      snakePower,
      avgSnakePower,
      weaselCount,
      avgWeaselPower,
      weaselPower,
      winner;
  Snake.find({}, (err, snakeData)=>{
    /* map across data to get total number of snakes and total of snake size values to get avg */
    snakeCount = snakeData.length;
    snakePower = snakeData.reduce((a,b)=>{
      return a + b.size;
    }, 0);
    avgSnakePower = snakePower / snakeCount;
    console.log('initial snake count and snake power:', snakeCount, snakePower);
    Weasel.find({}, (err, weaselData)=>{
      /* map across data to get total number of weasels and total of weasel strength values to get avg */
      weaselCount = weaselData.length;
      weaselPower = weaselData.reduce((a,b)=>{
        return a + b.strength;
      }, 0);
      avgWeaselPower = weaselPower / weaselCount;
      console.log('initial weasel count and weasel power:', weaselCount, weaselPower);
      winner = weaselPower >= snakePower ? 'weasels' : 'snakes';
      console.log(winner, snakePower, avgWeaselPower, snakeCount)
      res.json({message:`The battle is over. ${winner === 'weasels' ? weaselCount : snakeCount} ${winner} with an average strength of ${winner === 'weasels' ? avgWeaselPower : avgSnakePower} defeated ${winner === 'weasels' ? snakeCount : weaselCount} ${winner === 'weasels' ? 'snakes' : 'weasels'} with an average strength of ${winner === 'weasels' ? avgSnakePower : avgWeaselPower}.`})
    });
  });
});

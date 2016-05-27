const express = require('express');
const Snake = require(__dirname + '/../../schema/snake');
const Weasel = require(__dirname + '/../../schema/weasel');
const bodyParser = require('body-parser').json();

const battleRouter = module.exports = exports = express.Router();

battleRouter.get('/', (req, res)=>{
  let snakeCount, snakePower, weaselCount, weaselPower;
  Snake.find({}, (err, snakeData)=>{
    /* map across data to get total number of snakes and total of snake size values to get avg */
    snakeCount = snakeData.length;
  });
  Weasel.find({}, (err, weaselData)=>{
    /* map across data to get total number of weasels and total of weasel strength values to get avg */
    weaselCount = weaselData.length;
  })
});

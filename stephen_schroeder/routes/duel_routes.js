'use strict';

const express = require('express');
const Marvel = require(__dirname + '/../schema/marvel');
const DC = require(__dirname + '/../schema/dc');
const errorHandle = require(__dirname + '/../lib/err_handler');

const duelRouter = module.exports = exports = express.Router();

duelRouter.get('/duel', (req, res) => {
  Promise.all([Marvel.find({}), DC.find({})])
    .then(data => {
      res.status(200).json({ 'duel': data[0].length / data[1].length });
    })
    .catch(err => errorHandle(err, res));
});

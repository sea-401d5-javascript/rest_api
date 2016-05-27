'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Marvel = require(__dirname + '/../schema/marvel');
const errorHandle = require(__dirname + '/../lib/err_handler.js');

var marvelRouter = module.exports = exports = express.Router();

marvelRouter.get('/marvel', (req, res) => {
  Marvel.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

marvelRouter.post('/marvel', jsonParser, (req, res) => {
  var newMarvel = new Marvel(req.body);
  newMarvel.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

marvelRouter.put('/marvel/:id', jsonParser, (req, res) => {
  var jediData = req.body;
  delete jediData._id;
  Marvel.update({ _id: req.params.id }, jediData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({ msg: 'success' });
  });
});

marvelRouter.delete('/marvel/:id', (req, res) => {
  Marvel.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({ msg: 'success' });
  });
});

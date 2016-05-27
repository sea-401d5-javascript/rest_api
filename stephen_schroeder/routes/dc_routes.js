'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const DC = require(__dirname + '/../models/dc');
const errorHandle = require(__dirname + '/../lib/err_handler.js');

var dcRoute = module.exports = exports = express.Router();

dcRoute.get('/dc', (req, res) => {
  DC.find({}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

dcRoute.post('/dc', jsonParser, (req, res) => {
  var newDC = new DC(req.body);
  newDC.save((err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

dcRoute.put('/dc/:id', jsonParser, (req, res) => {
  var dcData = req.body;
  delete dcData._id;
  DC.update({ _id: req.params.id }, dcData, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

dcRoute.delete('/dc/:id', (req, res) => {
  DC.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

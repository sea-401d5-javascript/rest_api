'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const DC = require(__dirname + '/../schema/dc');
const errorHandle = require(__dirname + '/../lib/err_handler');

var dcRouter = module.exports = exports = express.Router();

dcRouter.get('/dc', (req, res) => {
  DC.find({}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

dcRouter.post('/dc', jsonParser, (req, res) => {
  var newDC = new DC(req.body);
  newDC.save((err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

dcRouter.put('/dc/:id', jsonParser, (req, res) => {
  var dcData = req.body;
  delete dcData._id;
  DC.update({ _id: req.params.id }, dcData, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

dcRouter.delete('/dc/:id', (req, res) => {
  DC.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

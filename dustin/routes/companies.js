'use strict';
var express = require('express');
var router = express.Router();
var db = require('json-fs-store')('./data');
var fs = require('fs');
var nextID = function () {
  return fs.readdirSync('./data').length + 1;
};

router.post('/', (req, res, next) => {
  let company = req.body;
  company.id = nextID();
  db.add(company, function (err) {
    if (err) throw err;
  });
  res.send({
    Message: "POST received"
  });
});

router.put('/id', (req, res, next) => {
  db.load(req.params.id, function (err, object) {
    if (err) {
      res.status(404).json({
        Error: 'Not Found'
      });
    }
    object.test = 100;
  });
});

router.get('/', (req, res, next) => {
  db.list(function (err, objects) {
    if (err) throw err;
    res.json(objects);
  });
});

router.get('/:id', (req, res, next) => {
  db.load(req.params.id, function (err, object) {
    if (err) {
      res.status(404).json({
        Error: 'Not Found'
      });
    }
    res.json(object);
  });
});

router.delete('/:id', (req, res, next) => {
  db.remove(req.params.id, function (err) {
    res.send({
      'Message': 'Entry DELETED'
    });
    if (err) {
      res.status(404).json({
        Error: 'Not Found'
      });
    }
  });
});

module.exports = router;

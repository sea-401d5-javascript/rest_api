'use strict';
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser').json();
const Shark = require('../model/shark');
const jwtAuth = require('../lib/jwt_auth')

//index companies
router.get('/', jwtAuth, (req, res, next) => {
  Shark.find({}, (err, companies) => {
    if (err) return next(err);
    res.json(companies);
  });
});

//create companies
router.post('/', bodyParser, jwtAuth, (req, res, next) => {
  let newShark = new Shark(req.body);
  newShark.save((err, shark) => {
    if (err) return next(err);
    res.json(shark);
  });
});

//put shark
router.put('/', bodyParser, jwtAuth, (req, res, next) => {
  let _id = req.body._id;
  Shark.findOneAndUpdate({_id}, req.body, (err) => {
    if (err) return next(err);
    let message = 'successfully update';
    res.json({
      message
    });
  });
});

//delete companies
router.delete('/:id', jwtAuth, (req, res, next) => {
  let _id = req.params.id;
  Shark.findOneAndRemove({
    _id
  }, (err) => {
    if (err) return next(err);
    let message = 'sucessfully deleted';
    res.json({
      message
    });
  });
});

module.exports = router;

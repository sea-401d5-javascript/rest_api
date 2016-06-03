'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic-http');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashedPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('User name already used'));
    newUser.save((err, user) => {
      if (err) return next(new Error('Could not save user'));
      res.json({message: req.body.username + ' We mad a token for you', token: user.generateToken()});
    });
  });
});

router.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error('Could not sign in'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('wrong password'));

    res.json({message: req.auth.username + ' Here is your token', token: user.generateToken()});
  });
});

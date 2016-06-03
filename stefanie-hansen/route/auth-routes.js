'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth');
const User = require('../model/user');
const router = module.exports = express.Router();

router.get('/login', basicAuth, (req, res, next) => {
  let username = req.auth.username;
  User.findOne({username}, (err, user) => {
    if (err || !user) return next(new Error('Cannot find user'));
    if (!user.comparePassword(req.auth.password)) {
      return next(new Error('Invalid password'));
    }
    return res.json({token: user.generateToken()});
  });
});

router.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  newUser.password = newUser.hashPassword();
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('Could not create user'));
    newUser.save((err, user) => {
      if (err) return next(new Error('Could not create user'));
      res.json({token: user.generateToken()});
    });
  });
});

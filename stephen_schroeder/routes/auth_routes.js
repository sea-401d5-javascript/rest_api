'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../schema/user');
const basicHTTP = require('../lib/basic_http');
const jwtAuth = require('../lib/jwt_auth');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('could not create user'));
    newUser.save((err, user) => {
      if (err) return next(new Error('could not create new user'));
      res.json({token: user.generateToken()});
    });
  });
});

router.get('/signin', basicHTTP, jwtAuth, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error('Could not sign in'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Bad Password'));

    res.json({token: user.generateToken()});
  });
});

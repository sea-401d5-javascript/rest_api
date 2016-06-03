'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require(__dirname + '/../model/user');
const basicHTTP = require(__dirname + '/../lib/basic_http');

const router = exports = module.exports = express.Router();

router.post('/signup', bodyParser, (req, res, next)=>{
  let a_User = new User(req.body);
  a_User.password = a_User.hashPassword();
  req.body.password = null;
  User.findOne({username:req.body.username}, (err, user)=>{
    if (err || user) return next(new Error('Error. Someone else may have this username already.'));
    a_User.save((err, user)=>{
      if (err) return next(new Error('Could not save user info. Please try again.'));
      res.json({token:user.generateToken(), message: `Welcome to Snakes vs. Weasels, ${user.username}.`});
    });
  });
});

router.get('/login', basicHTTP, (req, res, next)=>{
  User.findOne({username:req.auth.username}, (err, user)=>{
    if (err || !user) return next(new Error('Could not log in. Do you have an account?'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Sorry. Looks like your password was fucky.'));
    res.json({message:`Welcome back, ${user.username}.`});
  });
});

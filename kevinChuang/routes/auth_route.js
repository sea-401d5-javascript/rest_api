'use strict'

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../schema/user');
const basicHTTP = require('../lib/basicHTTP');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req,res,next)=> {
  let newUser = new User(req.body);
  newUser.password = newUser.hashing();
  req.body.password = null;
  User.findOne({username: req.body.username}, (err,user)=> {
    if(err || user) return next(new Error('Could not create user'));
    newUser.save((err,data)=> {
      if (err) return next(new Error('Could not create user'));
      res.json({token:data.tokenGen()});
    });
  });
});

router.post('/signin', basicHTTP, (req,res,next)=> {
  User.findOne({username:req.auth.username}, (err,user)=> {
    if(err) return next(new Error('Could not sign in'));
    if(user === null) return next(new Error('Could not sign in'));
    if(!user.verifyPass(req.auth.password)) return next(new Error('Could not sign in'));

    res.json({token:user.tokenGen()});
  });
});

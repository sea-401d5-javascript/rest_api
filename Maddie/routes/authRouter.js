'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../schema/user.js');



const authRouter = module.exports = exports = express.Router();

authRouter.post('/', bodyParser, (req,res,next) => {
  let newUser = new User(req.body);
  newUser.password = newUser.hashPassword();
  req.body.password = null;
  User.findOne({username:req.body.username}, (err,user) => {
    if(err || user) return next( new Error('User exists'));
    newUser.save((err,user) => {
      if(err) return next(new Error('could not save user'));
      res.json({token:user.generateToken(), user: user.username});
    });
  });
});

'use strict';
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const secret = process.env.SECRET || 'sashimi';

module.exports = function(req, res, next) {
  var token = req.headers.token || req.body.token ;
  var decodedToken;

  if(!token) return next(new Error('Authorization failure'));

  try {
    decodedToken = jwt.verify(token, secret);
  } catch(e) {
    return next(new Error('Authorization failure'));
  }

  User.findOne({_id:decodedToken._id},(err,user)=> {
    if(!user || err) return next(new Error('Authorization failure'));
    req.user = user;
    next();
  });
};

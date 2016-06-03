'use strict';
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const secret = process.env.SECRET || 'sashimi';

module.exports = function(req,res,next) {
  var token = req.body.token || req.headers.token;
  var tokenErr = new Error('Authorization failure');
  var decodedToken;

  if(!token) return(tokenErr);

  try {
    decodedToken = jwt.verify(token,secret);
  } catch(e) {
    return next(tokenErr);
  }

  User.findOne({_id:decodedToken._id},(err,user)=> {
    if(!user || err) return next(tokenErr);
    req.user = user;
    next();
  });
};

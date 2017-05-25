'use strict'
var jwt = require('jsonwebtoken');
var User = require('../model/user');
const secret = process.env.SECRET || 'changeme'

module.exports = function (req, res, next) {
  let token = req.headers.token || req.headers.token
  let tokenErr = new Error('Authorization Failure')
  let decodedToken;

  if (!token) return next(tokenErr);

  try {
    decodedToken = jwt.verify(token, secret);
  } catch (e) {
    return next(tokenErr)
  }

  User.findOne({
    _id: decodedToken._id
  }, (err, user) => {
    if (!user || err) return next(tokeErr);
    req.user = user;
    next();
  })

}

'use strict';

module.exports = function(req, res, next) {

  let authBuff = new Buffer(req.headers.authorization.split(' ').pop(), 'base64');
  let authArray = authBuff.toString().split(':');
  authBuff.fill(0);

  req.auth = {
    username: authArray[0],
    password: authArray[1]
  };

  if(!req.auth.username || !req.auth.password) {
    return next(new Error('Username or Password missing'));
  }

  next();
};

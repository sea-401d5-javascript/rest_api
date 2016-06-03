'use strict';

module.exports = function(req, res, next){
  let basicAuth = req.headers.authorization;
  let authString64 = basicAuth.split(' ').pop();
  let authBuff = new Buffer(authString64, 'base64');
  let authUTF8 = authBuff.toString();
  let authArr = authUTF8.split(':');
  authBuff.fill(0);

  req.auth = {
    username: authArr[0],
    password: authArr[1]
  };

  if(!req.auth.username || !req.auth.password){
    return next(new Error('Username or password missing.'));
  }
  next();
};

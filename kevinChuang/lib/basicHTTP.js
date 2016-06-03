'use strict'

module.exports = function(req,res,next) {
  var authString = req.headers.authorization.split(' ').pop();
  var authBuff = new Buffer(authString, 'base64');
  var authArray = authBuff.toString().split(':');
  authBuff.fill(0);

  req.auth = {
    username: authArray[0],
    password: authArray[1]
  };

  if(!req.auth.username || !req.auth.password) {
    return next(new Error('Username or Password missing!'));
  }
  next();
};

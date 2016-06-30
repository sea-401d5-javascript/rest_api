'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  username: {type: String, required:true},
  password: {type: String, required:true}
});

User.methods.hashing = function() {
  return bcrypt.hashSync(this.password, 5);
};

User.methods.verifyPass = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.methods.tokenGen = function() {
  return jwt.sign({_id:this._id}, process.env.SECRET || 'sashimi');
};

module.exports = mongoose.model('user', User);

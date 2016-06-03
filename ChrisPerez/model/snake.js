'use strict';

const mongoose = require('mongoose');

const Snake = new mongoose.Schema({
  name: String,
  weaselKiller: {type: Boolean, default: true},
  size: Number
});

module.exports = mongoose.model('snake', Snake);

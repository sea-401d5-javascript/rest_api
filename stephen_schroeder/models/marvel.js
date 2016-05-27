'use strict';

const mongoose = require('mongoose');

var Marvel = new mongoose.Schema({
  name: String,
  world: String,
  power: Number
});

module.exports = exports = mongoose.model('marvel', Marvel);

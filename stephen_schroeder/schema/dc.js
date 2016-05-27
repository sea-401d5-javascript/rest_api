'use strict';

const mongoose = require('mongoose');

var DC = new mongoose.Schema({
  name: String,
  world: String,
  powers: Number
});

module.exports = exports = mongoose.model('dc', DC);

'use strict';

const mongoose = require('mongoose');

const NbaPlayer = new mongoose.Schema({
  name: String,
  active: Boolean,
  height: Number,
  championships: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('nbaPlayer', NbaPlayer);

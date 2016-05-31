'use strict';

const mongoose = require('mongoose');

const NflPlayer = new mongoose.Schema({
  name: String,
  active: Boolean,
  weight: Number,
  championships: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('nflPlayer', NflPlayer);

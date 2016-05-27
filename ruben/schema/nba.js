'use strict';

const mongoose = require('mongoose');

const NbaPlayer = new mongoose.Schema({
  name: String,
  active: Boolean,
  championships: {
    type: Number,
    default: 0
  },
  average: Number
});

module.exports = mongoose.model('nbaPlayer', NbaPlayer);

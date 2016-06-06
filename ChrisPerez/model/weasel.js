'use strict';

const mongoose = require('mongoose');

const Weasel = new mongoose.Schema({
  name: String,
  snakeKiller: {type: Boolean, default: true},
  strength: Number
});

module.exports = mongoose.model('weasel', Weasel);

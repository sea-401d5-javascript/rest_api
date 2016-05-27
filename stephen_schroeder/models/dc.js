'use strict';

const mongoose = require('mongoose');

var dcSchema = new mongoose.Schema({
  name: String,
  lightsaberColor: String,
  world: String,
  master: Boolean,
  powers: Number
});

module.exports = exports = mongoose.model('DC', dcSchema);

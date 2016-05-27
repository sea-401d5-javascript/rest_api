'use strict';

const mongoose = require('mongoose');

var marvelSchema = new mongoose.Schema({
  name: String,
  lightsaberColor: String,
  world: String,
  master: Boolean,
  power: Number
});

module.exports = exports = mongoose.model('Marvel', marvelSchema);

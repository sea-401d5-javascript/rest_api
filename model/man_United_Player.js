'use strict';

const mongoose = require('mongoose');

const ManUnitedPlayer = new mongoose.Schema({
  name: String,
  position: String,
  number: Number,
  goals: Number
});

module.exports = mongoose.model('manUnitedPlayer', ManUnitedPlayer);

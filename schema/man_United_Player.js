'use strict';

const mongoose = require('mongoose');

const ManUnitedPlayer = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('manUnitedPlayer', ManUnitedPlayer);

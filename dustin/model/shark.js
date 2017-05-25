'use strict';
const mongoose = require('mongoose');

const Shark = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('sharks', Shark);

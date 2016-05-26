'use strict';

const mongoose = require('mongoose');

const Cat = new mongoose.Schema({
  name: String,
  size: String,
});

module.exports = mongoose.model('Cat', Cat);

'use strict';

const mongoose = require('mongoose');

const Cat = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('cat', Cat);

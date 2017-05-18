'use strict';

const mongoose = require('mongoose');

const Dog = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('dog', Dog);

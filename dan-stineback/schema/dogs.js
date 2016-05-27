'use strict';

const mongoose = require('mongoose');

const Dog = new mongoose.Schema({
  name: String,
  size: String,
});

module.exports = mongoose.model('dog', Dog);

'use strict';
const mongoose = require('mongoose');
const DogWalker = new mongoose.Schema({
  name: String,
  dogs_died: Number
});

module.exports = mongoose.model('dogWalker', DogWalker);

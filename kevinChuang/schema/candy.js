/*jshint esversion:6*/
/*eslint-env es6*/

const mongoose = require('mongoose');

const Candy = mongoose.Schema({
  name: String,
  edible: Boolean,
  stock: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('candy',Candy);

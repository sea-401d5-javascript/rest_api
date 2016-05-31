'use strict'
const mongoose = require('mongoose');
const Frenchie = new mongoose.Schema({
  name: String,
  dogWalkers_bitten: Number
});

module.exports = mongoose.model('frenchie', Frenchie);

'use strict';

const mongoose = require('mongoose');

const Messi = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('messi', Messi);

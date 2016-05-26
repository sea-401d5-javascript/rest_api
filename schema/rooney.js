'use strict';

const mongoose = require('mongoose');

const Rooney = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('rooney', Rooney);

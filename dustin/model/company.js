 'use strict';
 const mongoose = require('mongoose');

 const Company = new mongoose.Schema({
   name: String,
   tvDealReached: Boolean,
   seekAmount: Number,
   seekEquity: Number,
   seekValuation: Number,
   tvDealAmount: Number,
   tvDealEquity: Number,
   tvDealValuation: Number,
   actualDealReached: Boolean,
   actualDealAmount: Number,
   actualDealEquity: Number,
   actualDealValuation: Number,
   season: Number,
   episode: Number
     //sharks: Schema.Types.sharks;
     //{type: Number, default: 0}
 });

 module.exports = mongoose.model('companies', Company);

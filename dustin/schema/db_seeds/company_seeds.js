'use strict';

const mongoose = require('mongoose');
const Company = require('../../schema/companies');

process.env.NODE_ENV = 'DEV';
if (process.env.NODE_ENV === 'TEST') mongoose.connect('mongodb://localhost/test_db');
if (process.env.NODE_ENV === 'DEV') mongoose.connect('mongodb://localhost/dev_db');

mongoose.connection.collections['companies'].drop(function () {
  console.log('collection dropped');
});

new Company({
  name: 'Scrub Daddy',
  tvDealReached: true,
  tvDealAmount: 300000,
  tvDealEquity: .33,
  tvDealValuation: 1000000,
  actualDealReached: true,
  season: 4,
  episode: 7
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Company ' + data.name + ' created');
});

new Company({
  name: 'Squatty Potty',
  tvDealReached: true,
  tvDealAmount: 350000,
  tvDealEquity: .1,
  tvDealValuation: 3500000,
  actualDealReached: true,
  season: 6,
  episode: 9
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Company ' + data.name + ' created');
});

new Company({
  name: 'Cousins Maine Lobster',
  tvDealReached: true,
  tvDealAmount: 55000,
  tvDealEquity: .15,
  tvDealValuation: 366667,
  actualDealReached: true,
  season: 4,
  episode: 6
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Company ' + data.name + ' created');
});

new Company({
  name: 'Tower Paddle Boards',
  tvDealReached: true,
  tvDealAmount: 150000,
  tvDealEquity: .3,
  tvDealValuation: 500000,
  actualDealReached: true,
  season: 3,
  episode: 9
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Company ' + data.name + ' created');
});

new Company({
  name: 'Bantam Bagels',
  tvDealReached: true,
  tvDealAmount: 275000,
  tvDealEquity: .25,
  tvDealValuation: 1100000,
  actualDealReached: true,
  season: 6,
  episode: 13
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Company ' + data.name + ' created');
  mongoose.connection.close(function (data) {
    //if (cb) cb();
  });
})

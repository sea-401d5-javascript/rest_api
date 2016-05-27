'use strict';

const mongoose = require('mongoose');
const Shark = require('../../schema/sharks');

process.env.NODE_ENV = 'DEV';
if (process.env.NODE_ENV === 'TEST') mongoose.connect('mongodb://localhost/test_db');
if (process.env.NODE_ENV === 'DEV') mongoose.connect('mongodb://localhost/dev_db');
console.log("ger");
new Shark({
  name: 'Kevin O\'Leary'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

new Shark({
  name: 'Barbara Corcoran'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

new Shark({
  name: 'Daymond John'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

new Shark({
  name: 'Robert Herjavec'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

new Shark({
  name: 'Lori Greiner'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

new Shark({
  name: 'Mark Cuban'
}).save((err, data) => {
  if (err) console.log(err);
  if (data) console.log('Shark ' + data.name + ' created');
});

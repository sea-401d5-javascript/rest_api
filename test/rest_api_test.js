'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const ManUnitedPlayer = require('../schema/man_United_Player');
const BarcaPlayer = require('../schema/barca_Player');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

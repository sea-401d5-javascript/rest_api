'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');



const fs = require('fs');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

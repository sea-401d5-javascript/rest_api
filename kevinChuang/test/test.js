'use strict';
const expect = require('chai').expect;
const basicHTTP = require('../lib/basicHTTP');
const jwtAuth = require('../lib/jwtAuth');
const User = require('../schema/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_db');

const secret = process.env.SECRET = 'test';

describe('Middleware testing',()=> {
  after((done)=> {
    mongoose.connection.db.dropDatabase(()=> {
      mongoose.disconnect();
      done();
    });
  });

  describe('basicHTTP',()=> {
    it('should parse basic Authorization',(done)=> {
      var authorization = makeAuthString('test:test');
      var req = {headers:{authorization}};
      let res = {};

      basicHTTP(req,res,()=> {
        expect(req.auth.username).to.eql('test');
        expect(req.auth.password).to.eql('test');
        done();
      });
    });
  });
});

function makeAuthString(str) {
  var baseString = (new Buffer(str, 'utf8')).toString('base64');
  return `Basic ${baseString}`;
}

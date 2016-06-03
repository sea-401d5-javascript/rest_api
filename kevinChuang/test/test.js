'use strict';
const expect = require('chai').expect;
const basicHTTP = require('../lib/basicHTTP');
const jwtAuth = require('../lib/jwtAuth');
const User = require('../schema/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_db');

var secret =  process.env.SECRET = 'sashimi';

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
      var res = {};

      basicHTTP(req,res,()=> {
        expect(req.auth.username).to.eql('test');
        expect(req.auth.password).to.eql('test');
        done();
      });
    });

    it('should error if no password is provided',(done)=> {
      var authorization = makeAuthString('test:');
      var req = {headers:{authorization}};
      var res={};

      basicHTTP(req,res,(err)=> {
        expect((err).message).to.eql('Username or Password missing!');
        done();
      });
    });
  });

  describe('token parser',()=> {
    var test_id;

    before((done)=> {
      var newUser = new User({username:'test',password:'test'});
      newUser.save((err,user)=> {
        if(err) throw err;
        test_id = user._id;
        done();
      });
    });

    it('should accept a valid token', (done)=> {
      var token = jwt.sign({_id: test_id},secret);
      var req = {headers:{token}};

      jwtAuth(req,null,function() {
        expect(req.user._id).to.eql(test_id);
        done();
      });
    });

    it('should error on invalid token', (done)=> {
      var token = jwt.sign({_id: 'invalid'}, secret);
      var req = {headers:{token}};

      jwtAuth(req, null, function(err) {
        expect(err.message).to.eql('Authorization failure');
        done();
      });
    });
  });
});

function makeAuthString(str) {
  var baseString = (new Buffer(str, 'utf8')).toString('base64');
  return `Basic ${baseString}`;
}

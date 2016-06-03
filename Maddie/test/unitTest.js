'use strict';

const verifyToken = require('../lib/auth_token.js');
const basicHTTP = require('../lib/basic_http.js');
const jwt = require('jsonwebtoken');
const User = require('../schema/user.js');
const secret = process.env.SECRET || 'test';

const expect = require('chai').expect;

const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/3000/test';

describe('Unit Test', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  describe('Verify Token', () => {
    let testUser;
    before((done) => {
      let newUser = new User({username:'Coach', password: 'Kerr'});
      newUser.save((err,user) => {
        testUser = user;
        done();
      });
    });
    it('should decode token', (done) => {
      let token = jwt.sign({_id:testUser._id}, secret);
      let req = {headers:{token}, username:testUser.username};

      verifyToken(req,null,() => {
        expect(req.username).to.eql('Coach');
        done();
      });
    });
    it('should send error when invalid token', (done) => {
      let token = jwt.sign({_id:'invalid'}, secret);
      let req = {headers:{token}};

      verifyToken(req,null,(err) => {
        expect(err.message).to.eql('Authorization failed');
        done();
      });
    });
    describe('Basic Auth', () => {
      it('should parse auth', (done) => {
        let authorization = 'Basic ' + ((new Buffer('MVP:CURRY', 'utf8')).toString('base64'));
        let req = {headers:{authorization}};
      

        basicHTTP(req,{}, () => {
          expect(req.authorization.username).to.eql('MVP');
          expect(req.authorization.password).to.eql('CURRY');
          done();
        });
      });
      it('should send error when invalid field', (done) => {
        let authorization = 'Basic' + ((new Buffer('Klay', 'utf8')).toString('base64'));
        let req = {headers:{authorization}};

        basicHTTP(req,{}, (err) => {
          expect(err.message).to.eql('Need username or password');
          done();
        });
      });
    });
  });
});

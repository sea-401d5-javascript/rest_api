'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('chai').request;
const mongoose = require('mongoose');
const basicAuth = require('../lib/basic-auth');
const jwtAuth = require('../lib/jwt-auth');
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('unit tests', () => {
  let authString;
  let baseString;
  let req;
  let token;

  before((done) => {
    request('localhost:3000')
    .post('/signup')
    .send({username:'test', password:'test'})
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });

  it('should decode a basic auth string into username and password', () => {

    baseString = new Buffer('user:pass').toString('base64');
    authString = 'Basic ' + baseString;
    req = {
      headers: {
        authorization: authString
      }
    };

    basicAuth(req, {}, () => {
      expect(req.auth).to.eql({username: 'user', password: 'pass'});
    });
  });

  it('should find a user given a token for JWT authorization', (done) => {

    req = {
      headers: {
        token: token
      }
    };

    jwtAuth(req, null, () => {
      expect(req).to.have.property('user');
      expect(req.user.username).to.eql('test');
      done();
    });
  });

  it('should error on invalid token', (done) => {
    req = {
      headers: {
        token: 'invalid'
      }
    };

    jwtAuth(req, null, (err) => {
      expect(err.message).to.eql('Invalid token');
      done();
    });

  });


  describe('auth route tests', () => {

    after((done)=> {
      process.env.MONGOLAB_URI = dbPort;
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should sign up a new user', (done) => {
      request('localhost:3000')
      .post('/signup')
      .send({username:'test2', password:'test2'})
      .end((err, res) => {
        token = res.body.token;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof token).to.eql('string');
        done();
      });
    });

    it('should sign in a user with a token', (done) => {
      request('localhost:3000')
      .get('/login')
      .auth('test2', 'test2')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.token).to.eql(token);
        done();
      });
    });
  });
});

describe('catch all test', () => {

  it('should give an error for unsupported routes', (done) => {
    request('localhost:3000')
    .get('/test')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.body).to.eql({Message: 'Not Found'});
      done();
    });
  });
});

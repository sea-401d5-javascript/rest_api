'use strict';
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const basicHTTP = require('../lib/basic-http.js');
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('user tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
      it('should signup a new user', (done) => {
        request('localhost:3000')
        .post('/signup')
        .send({username:'username', password: 'password'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          console.log(res.body);
          expect(res.body).to.have.property('token');
          done();
        });
      });
  it('should sign in a user', (done) => {
    request('localhost:3000')
      .get('/signin')
      .auth('username', 'password')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

describe('error catch test', () => {
  it('should give an error for unsupported routes', (done) => {
  request('localhost:3000')
  .get('/*')
  .end((err, res) => {
    expect(err).to.not.eql(null);
    expect(res).to.have.status(404);
    console.log(res.body);
    expect(res.body).to.eql({message: 'not found'});
    done();
    });
  });
});

describe('Auth tests', ()=>{
  it('should create basic authorization', ()=>{
  let testAuth = 'Basic ' + new Buffer('username:password').toString('base64');
  let req = {};
  let res = {};
  req.headers = {authorization:testAuth};

  basicHTTP(req, res, ()=>{
    expect(req.auth.username).to.eql('username');
    expect(req.auth.password).to.eql('password');
    });
  });
});

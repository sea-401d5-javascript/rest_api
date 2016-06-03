'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Authorization router tests', () => {

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  describe('Authorization tests', () => {
    it('Should sign up a new user', (done) => {
      request('localhost:6969')
      .post('/auth/signup')
      .send({username: 'testy', password: 'test'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.token).to.eql('token');
        done();
      });
    });
    it('Should login a user', (done) => {
      request('localhost:6969')
      .get('/auth/login')
      .auth('testy', 'test')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.token).to.eql('token');
        done();
      });
    });
  });
});

'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const dbPort = process.env.MONGOLAB_URI;
process.env.NODE_ENV = 'TEST';
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('User authorization should', () => {
  let testUser;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq'
    });
    newUser.save((err, user) => {
      testUser = user;
      done();
    });
  });
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('allow a known user to login', (done) => {
    request('localhost:3000')
      .get('/signin')
      .auth('testuser', 'testuser')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('allow a new user to be created', (done) => {
    request('localhost:3000')
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'user',
        password: 'password'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        //expect(res.body.token).to.have.eql('posty');
        expect(res.body).to.have.property('token');
        done();
      });
  });
    });

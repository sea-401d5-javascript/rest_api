
'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const jwt = require('jsonwebtoken');

const expect = chai.expect;
const request = chai.request;

const secret = process.env.SECRET || 'changeme';
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Authorization router tests', () => {

  let testUser;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$tExN9A1AEkj.V9ea5IMdPOyU6haLngPQgnsmpdIUce14Vk.3cSTqe'
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


  it('Should login a user', (done) => {
    request('localhost:6969')
    .get('/auth/login')
    .auth('testuser', 'test')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.token).to.eql(jwt.sign({
        _id: testUser._id
      }, secret));
      done();
    });
  });

  it('Should sign up a new user', (done) => {
    request('localhost:6969')
    .post('/auth/signup')
    .set('Content-Type', 'application/json')
    .send({username: 'testy', password: 'test'})
    .end((err, res) => {User.find({username: 'testy'}, (err, user) => {
      if (err) return err;
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.token).to.eql(jwt.sign({_id: user[0]._id}, secret));
      done();
    });
    });
  });
});

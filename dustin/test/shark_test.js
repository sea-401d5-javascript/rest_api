'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const Shark = require('../model/shark');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';

const dbPort = process.env.MONGOLAB_URI;
process.env.NODE_ENV = 'TEST';
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('The /shark route', () => {
  let testShark;
  let testUser;
  let token;

  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq'
    });
    newUser.save((err, user) => {
      testUser = user;
      token = jwt.sign({_id: testUser._id}, secret);
    });
    let newShark = new Shark({
      name: 'test'
    });
    newShark.save((err, shark) => {
      testShark = shark;
      done();
    });
  });
  afterEach((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('GET should return a list of sharks', (done) => {
    request('localhost:3000')
      .get('/sharks/')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('POST should accept a post and create a new shark', (done) => {
    request('localhost:3000')
      .post('/sharks/')
      .set('token', token)
      .send({
        name: 'posty'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.have.eql('posty');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('PUT should update a shark', (done) => {
    testShark.name = 'updated';
    request('localhost:3000')
      .put('/sharks/')
      .send(testShark)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('successfully update');
        done();
      });
  });

  it('DELETE should remove a shark', (done) => {
    request('localhost:3000')
      .delete('/sharks/' + testShark._id)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('sucessfully deleted');
        done();
      });
  });
});

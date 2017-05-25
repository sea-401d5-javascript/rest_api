'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const Company = require('../model/company');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';

const dbPort = process.env.MONGOLAB_URI;
process.env.NODE_ENV = 'TEST';
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('The /company route', () => {
  let testCompany;
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
    new Company({
      name: 'Scrub Daddy',
      tvDealReached: true,
      tvDealAmount: 300000,
      tvDealEquity: .33,
      tvDealValuation: 1000000,
      actualDealReached: true,
      season: 4,
      episode: 7
    }).save((err, data) => {
      if (data) testCompany = data;
      if (err) throw err;
    });

    new Company({
      name: 'Squatty Potty',
      tvDealReached: true,
      tvDealAmount: 350000,
      tvDealEquity: .1,
      tvDealValuation: 3500000,
      actualDealReached: true,
      season: 6,
      episode: 9
    }).save((err) => {
      if (err) throw err;
    });

    new Company({
      name: 'Cousins Maine Lobster',
      tvDealReached: true,
      tvDealAmount: 55000,
      tvDealEquity: .15,
      tvDealValuation: 366667,
      actualDealReached: true,
      season: 4,
      episode: 6
    }).save((err) => {
      if (err) throw err;
    });

    new Company({
      name: 'Tower Paddle Boards',
      tvDealReached: true,
      tvDealAmount: 150000,
      tvDealEquity: .3,
      tvDealValuation: 500000,
      actualDealReached: true,
      season: 3,
      episode: 9
    }).save((err) => {
      if (err) throw err;
    });

    new Company({
      name: 'Bantam Bagels',
      tvDealReached: true,
      tvDealAmount: 275000,
      tvDealEquity: .25,
      tvDealValuation: 1100000,
      actualDealReached: true,
      season: 6,
      episode: 13
    }).save((err,data) => {
      if (err) throw err;
      if (data) done();
    });
  });
  afterEach((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('GET should return a list of companies', (done) => {
    request('localhost:3000')
      .get('/companies/')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('POST should accept a post and create a new company', (done) => {
    request('localhost:3000')
      .post('/companies/')
      .send({
        name: 'posty'
      })
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.have.eql('posty');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('PUT should update a company', (done) => {
    testCompany.name = 'updated';
    request('localhost:3000')
      .put('/companies/')
      .send(testCompany)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('successfully update');
        done();
      });
  });

  it('DELETE should remove a company', (done) => {
    request('localhost:3000')
      .delete('/companies/' + testCompany._id)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('sucessfully deleted');
        done();
      });
  });

  it('/dealstats return deal stats', (done) => {
    request('localhost:3000')
      .get('/companies/dealstats')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({averageTvDealValuation:1293333.4, totalTvDealValuation:6466667});
        done();
      });
  });
});

'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');

process.env.MONGOLABL_URI = 'mongodb://localhost/duel_test';

describe('testing the non crud resource', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should test the duel routes/promise', (done) => {
    request('localhost:3000')
    .get('/api/duel')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.not.eql(true);
      expect(res).to.have.headers;
      done();
    });
  });
});

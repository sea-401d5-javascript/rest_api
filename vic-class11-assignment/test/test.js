'use strict';

const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

const server = require(__dirname + '/../lib/server');

require('../index');

describe('Testing CRUD routes', () => {
  it('should respond with 404 to bad path', (done) => {
    request('localhost:3000')
    .get('/*')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('not found')
      done();
    });
  });
  it('should return a get message', (done) => {
    request('localhost:3000')
    .get('/articles')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"ARTICLES"}');
      done();
    });
  });
  it('should return a post message', (done) => {
    request('localhost:3000')
    .post('/articles')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"post success"}');
      done();
    });
  });
  it('should return a put message', (done) => {
    request('localhost:3000')
    .put('/articles')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"put success"}');
      done();
    });
  });
  it('should return a patch message', (done) => {
    request('localhost:3000')
    .patch('/articles')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"patch success"}');
      done();
    });
  });
  it('should return a delete message', (done) => {
    request('localhost:3000')
    .delete('/articles')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"delete success"}');
      done();
    });
  });
});

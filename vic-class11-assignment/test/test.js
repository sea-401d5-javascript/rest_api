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
  it('should respond with 404 to bad path', () => {
    request('localhost:3000')
    .get('/badpath')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('{"message":"not found"}');
    });
  });
  it('should return a get message', (done) => {
    request('localhost:3000/articles')
    .get('/more')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"MORE"}');
      done();
    });
  });
  it('should return a post message', (done) => {
    request('localhost:3000/articles')
    .post('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"post success"}');
      done();
    });
  });
  it('should return a put message', (done) => {
    request('localhost:3000/articles')
    .put('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"put success"}');
      done();
    });
  });
  it('should return a patch message', (done) => {
    request('localhost:3000/articles')
    .patch('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"patch success"}');
      done();
    });
  });
  it('should return a delete message', (done) => {
    request('localhost:3000/articles')
    .delete('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200)
      expect(res.text).to.eql('{"message":"delete success"}');
      done();
    });
  });
});

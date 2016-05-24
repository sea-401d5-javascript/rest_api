'use strict';

const fs = require('fs');
const express = require('express');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const server = require(__dirname + '/../lib/server');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const myRouter = express.Router();

app.use(jsonParser);
require('../index');

describe('testing path', () => {
  it('should return GET message', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Mission accomplished. Time for a beer.  ');
      done();
    });
  });
  it('should write POST mesage', (done) => {
    request('localhost:3000')
    .post('/zoots')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(('{"message":"This is some sweet sweet JSON. "}'));
      done();
    });
  });
  it('should write PUT message', (done) => {
    request('localhost:3000')
    .put('/zoots')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"Party Under Trees JSON "}');
      done();
    });
  });
  it('should write PATCH message', (done) => {
    request('localhost:3000')
    .patch('/zoots')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"Just a small fix JSON"}');
      done();
    });
  });
  it('should test DELETE and write new message', (done) => {
    request('localhost:3000')
    .delete('/zoots')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(2);
      expect(res.text).to.eql('{"message":"Nothing to see here folks test test"}')
    });

    done();
  })
  it('should respond with 404 to bad path', () => {
    request('localhost:3000')
    .get('/*')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('not found');
    });
  });
});

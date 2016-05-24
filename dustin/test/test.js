'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
var fs = require('fs');
chai.use(chaiHTTP);
const request = chai.request;
require('../server');

var dbEntries = fs.readdirSync('./data').length
var payload = {
  company: 'Tanktest',
  seek_dollar: '200000',
  seek_equity: '.2',
  id: (dbEntries + 1)
};

  describe('Shark tank API should', function () {
  it('accept a POST request to /companies', function (done) {
    request('localhost:3000')
      .post('/companies')
      .send(payload)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"Message":"POST received"}');
        done();
      });
  });


    it('list all companies in the "database"', function (done) {
      request('localhost:3000')
        .get('/companies')
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.length).to.eql(dbEntries + 1)
          done();
        });
    });



  it('list a company by id', function (done) {
    request('localhost:3000')
      .get('/companies/' + (dbEntries + 1))
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql(payload)
        done();
      });
  });

  // it('respond to a PUT request on default route /', function (done) {
  //   request('localhost:3000')
  //     .put('/')
  //     .end(function (err, res) {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.text).to.eql('{"Message":"PUT request to homepage received"}');
  //       done();
  //     });
  // });


  it('properly DELETE', function (done) {
    request('localhost:3000')
      .delete('/companies/' + (dbEntries + 1))
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"Message":"Entry DELETED"}');
        done();
      });
  });

  //

  //
  // it('respond to a PATCH request on default route /', function (done) {
  //   request('localhost:3000')
  //     .patch('/')
  //     .end(function (err, res) {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.text).to.eql('{"Message":"PATCH request to homepage received"}');
  //       done();
  //     });
  // });
  //
  it('respond with 404 to an invalid route', function (done) {
    request('localhost:3000')
      .get('/companies/' + (dbEntries + 1))
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.text).to.eql('{"Error":"Not Found"}');
        done();
      });
  });
  //
  // it('respond with 400 if an invalid request is made', function (done) {
  //   request('localhost:3000')
  //     .copy('/')
  //     .end(function (err, res) {
  //       expect(res).to.have.status(400);
  //       expect(res.text).to.eql('{"Error":"Bad Request"}');
  //       done();
  //     });
  // });

});

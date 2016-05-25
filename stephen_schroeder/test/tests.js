'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
require(__dirname + '/../index');
require(__dirname + '/../lib/server');

const server = require(__dirname + '/../lib/server.js');

describe('routing test', () => {
  it('should hit the GET route', (done) => {
    request('localhost:3000/icoMatch')
    .get('/hugemanatee')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({ msg: "HUGEMANATEE" });
      done();
    });
  });

  it('should hit the POST route', (done) => {
    request('localhost:3000/icoMatch')
    .post('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({ msg: 'crassIsNotSass'});
      done();
    });
  });

  it('should hit the DELETE route', (done) => {
    request('localhost:3000/icoMatch')
    .delete('/larry')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({ msg: "File larry has been removed" });
      done();
    });
  });

  it('should hit the PUT route', (done) => {
    request('loccalhost:3000/icoMatch')
    .put('/sucker')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({ msg: 'Hello from sucker put route' });
      done();
    });
  });

});

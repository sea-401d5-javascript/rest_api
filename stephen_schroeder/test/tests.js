'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
// require(__dirname + '/../index');

const server = require(__dirname + '/../lib/router.js');

describe('routing test', () => {
  it('should hit the GET stuff route', (done) => {
    request('localhost:3000')
    .get('/hugemanatee')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({ msg: "HUGEMANATEE" });
      done();
    });
  });
});

'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
require('../server');

describe('express tests', () => {
  it('should hit all routes successfully', (done) => {
    chai.request('localhost:3000')
     .get('/players')
     .end(function(err, res){
     expect(res).to.have.status(200);
     done();
  });
  it('should successfully delete', () => {
    .delete('/delete')
  });
  it('should successfully post', () => {
    .post('/post')
  });
  it('should successfully put' () => {
    .put('/put')
  });
  });
});

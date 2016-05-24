'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use('chaiHTTP');
require('../server');

describe('express tests', () => {
  it('should hit all routes successfully', (done) => {
    chai.request('localhost:3000')
     .get('/players')
     .post('/post')
     .put('/put')
     .end(function(err, res){
     res.should.have.status(404);
     done();
  });
//   it('should successfully delete')
//   .delete('/:id')
//   .delete('/delete')
});
});

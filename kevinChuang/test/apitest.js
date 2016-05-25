/*eslint-env es6*/
/*jshint esversion:6*/

const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;

require('../server');

// describe('Initial cookie GET requests',()=>{
//   it('should notify there is initially no cookies',(done)=>{
//     request('localhost:3000')
//     .get('/cookies')
//     .end((req,res)=>{
//       expect(res.text).to.eql('{"message":"No cookies in the jar!"}');
//       done();
//     });
//   });
// });

describe('Get after posting',()=>{
  it('should return the cookie that was sent',(done)=> {
    request('localhost:3000')
    .post('/cookies')
    .send('{"cookie":"chocolate"}')
    .then((res)=>{
      request('localhost:3000')
      .get('/cookies')
      .end((req,res)=>{
        expect(res.text).to.eql('{"cookie":"chocolate"}');
        done();
    });
    // .end((req,res)=>{
      // });
    });
  });
});

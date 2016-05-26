'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const fs = require('fs');

let fileArr = [];
let newFileArr = [];
let newDeletedFileArr = [];
let newFileOne;
let fileOne;



require(__dirname + '/../server');

describe('rest api tests', () => {
  before('read files in data', (done) => {
    fileArr = fs.readdirSync(__dirname + '/../data');
    done();
     });
   it('should post correctly', (done) => {
    request('localhost:3000')
      .post('/rooney')
      .send('{"test": "test"}')
      .end((err, res) => {
        newDeletedFileArr = fs.readdirSync(__dirname + '/../data');
        expect(err).to.eql(null);
        expect(newDeletedFileArr).to.eql(fileArr);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should delete correctly', (done) => {
   request('localhost:3000')
     .delete('/rooney/8')
     .end((err, res) => {
       newFileArr = fs.readdirSync(__dirname + '/../data');
       expect(err).to.eql(null);
       expect(newFileArr).to.not.eql(fileArr);
       expect(res).to.have.status(200);
       done();
     });
 });
  it('should respond to a failed test', (done) => {
    request('localhost:3000')
    .get('/fail')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      done();
    });
  });
  it('should process get request correctly', (done) => {
    request('localhost:3000')
      .get('/rooney')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('GLORY MAN UNITED');
        done();
      });
  });

  it('should turn special id get request to uppercase', (done) => {
    request('localhost:3000')
    .get('/rooney/wayne')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"WAYNE"}');
      done();
    });
  });

describe('put tests', () => {
  before('read file', () => {
     fileOne = fs.readFileSync(__dirname + '/../data/1.json').toString();
  })
  it('should put properly', (done) =>
   {
    request('localhost:3000')
      .put('/rooney/1')
      .send('{"test": "test"}')
      .end((err, res) => {
        newFileOne = fs.readFileSync(__dirname + '/../data/1.json').toString();
        expect(err).to.eql(null);
        expect(newFileOne).to.not.eql(fileOne);
        expect(res).to.have.status(200);
        done();
      });
  });
})
})

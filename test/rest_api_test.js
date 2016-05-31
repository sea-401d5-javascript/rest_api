'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const fs = require('fs');
const stream = require('stream');

let fileArr = [];
let newFileArr = [];
let newDeletedFileArr = [];
let newFileOne;
let fileOne;
let rooney = '';
let testFile;
let file;

const dir =  __dirname + '/../data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

require(__dirname + '/../lib/server');

describe('rest api tests', () => {
  beforeEach('read files in data', (done) => {
    fileArr = fs.readdirSync(__dirname + '/../data');
    testFile = '{"test": "test"}';
    done();
  });

  it('should post correctly', (done) => {
    request('localhost:3000')
      .post('/rooney')
      .send(testFile)
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
     .delete('/rooney')
     .end((err, res) => {
      //  newFileArr = fs.readdirSync(__dirname + '/../data');
       expect(err).to.eql(null);
       expect(res.body.message).to.eql('successfully deleted');
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
    });
    it('should put properly', (done) =>
   {
      request('localhost:3000')
        .put('/rooney/1')
        .send('{"test": "test"}')
        .end((err, res) => {
          newFileOne = fs.readFileSync(__dirname + '/../data/1.json').toString();
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('successfully updated');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

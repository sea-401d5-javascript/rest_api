const chai = require('chai');
const chaiHTTP = require('chai-http');
const fs = require('fs');
const expect = chai.expect
chai.use(chaiHTTP)
const request = chai.request
require('../server.js')

var fileArray = [];
var newArray = [];
var deleteArray = [];
var file1;

describe('HTTP TESTS', () => {

  before('read files', () => {
    fileArray = fs.readdirSync(__dirname + '/../data');
    file1 = fs.readFileSync(__dirname + '/../data/frenchie1.json').toString();
  })

  it('should send text with GET on /frenchie', (done) => {
    request('localhost:3000')
    .get('/frenchies')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Hello, here is a Frenchie' + '\n')
      done();
    })
  })

  it('should post new file', (done) => {
    request('localhost:3000')
    .post('/frenchies')
    .send('{"frenchie":"phillip"}')
    .end((err,res) => {
      newArray = fs.readdirSync(__dirname + '/../data')
      expect(err).to.eql(null);
      expect(fileArray).to.not.eql(newArray)
      done();
    })
  })

  it('should replace msg with PUT', (done) => {
    request('localhost:3000')
    .put('/frenchies/1')
    .send('{"frenchie":"jaxx"}')
    .end((err,res) => {
      var newFile = fs.readFileSync(__dirname + '/../data/frenchie1.json').toString()
      expect(err).to.eql(null);
      console.log(newFile)
      expect(newFile).to.not.eql(file1)
      done();
    })
  })

  it('should reach error if no route', (done) => {
    request('localhost:3000')
    .get('/error')
    .end((err,res) => {
      expect(res.text).to.eql('Not Found')
      done();
    })
  })
})

describe('Delete HTTP tests', () => {
  before('read files', () => {
    fileArray = fs.readdirSync(__dirname + '/../data')
  })
  it('should delete the file', (done) => {
    request('localhost:3000')
    .delete('/frenchies/1')
    .end((err,res) => {
      deleteAray = fs.readdirSync(__dirname + '/../data')
      expect(err).to.eql(null);
      expect(fileArray).to.not.eql(deleteArray)
      done();
    })
  })
})

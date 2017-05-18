'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const Cat = require('../model/cats');
const Dog = require('../model/dogs');
const basic = require('../lib/basic-http');

const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGODB_URI;

process.env.MONGODB_URI = 'mongodb://localhost/test_db';
require('../server');


describe('Cat test', () => {
  after((done)=> {
    process.env.MONGODB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=>{
      done();
    });
  });
  it('should get a list of cats', (done) => {
    request('localhost:3000')
      .get('/cats/')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should post a cats', (done) => {
    let vic = {name: 'Vic', size: 'large'};
    request('localhost:3000')
      .post('/cats/')
      .send(vic)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Vic');
        expect(res.body).to.have.property('_id');
        done();
      });
  });


  describe('test that need data', ()=> {
    let testCat;
    beforeEach((done)=> {
      let newCat = new Cat({name: 'test', size: 'large'});
      newCat.save((err, Cat)=> {
        testCat = Cat;
        done();
      });
    });
    it('should return a updated cats', (done) => {
      testCat.name = 'updated';
      request('localhost:3000')
        .put('/cats/')
        .send(testCat)
        .end((err,res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
    });
    it('should delete a cat', (done)=>{
      request('localhost:3000')
        .delete('/cats/' + testCat._id)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
    });
  });
});

describe('Dog test', () => {
  after((done)=> {
    process.env.MONGODB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=>{
      done();
    });
  });
  it('should get a list of dogs', (done) => {
    request('localhost:3000')
      .get('/dogs/')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should post a dogs', (done) => {
    let vic = {name: 'Vic', size: 'large'};
    request('localhost:3000')
      .post('/dogs/')
      .send(vic)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Vic');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('test that need data', ()=> {
    let testDog;
    beforeEach((done)=> {
      let newDog = new Dog({name: 'test', size: 'large'});
      newDog.save((err, Dog)=> {
        testDog = Dog;
        done();
      });
    });
    it('should return a updated dogs', (done) => {
      testDog.name = 'updated';
      request('localhost:3000')
        .put('/dogs/')
        .send(testDog)
        .end((err,res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
    });
    it('should delete a dog', (done)=>{
      request('localhost:3000')
        .delete('/cats/' + testDog._id)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
    });
  });
});

describe('unit tests for auth', () => {
  it('should auth a user', () => {
    let baseString = new Buffer('vic:password').toString('base64');
    let authString = 'Basic ' + baseString;
    let req = {headers:{authorization: authString}};
    basic(req, {}, () => {
      expect(req.auth).to.eql({username: 'vic', password: 'password'});
    });
  });
});

describe('signin tests', () => {
  after((done)=> {
    process.env.MONGODB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should have a token', (done) => {
    request('localhost:3000')
    .post('/signup')
    .send({username:'vic', password:'vic'})
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('token');
      done();
    });
  });
});

describe('catch error test', () => {
  it('should give an error for unsupported routes', (done) => {
    request('localhost:3000')
    .get('/*')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.body).to.eql({message: 'not found'});
      done();
    });
  });
});

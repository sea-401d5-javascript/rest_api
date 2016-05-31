'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const Frenchies = require('../schema/frenchies.js')
const DogWalkers = require('../schema/dogWalkers.js')
const mongoose = require('mongoose')

const expect = chai.expect
const request = chai.request
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/3000/test'
require('../server.js')

describe('Frenchie Tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  });
  it('should get a list of frenchies', (done) => {
    request('localhost:3000')
    .get('/frenchie')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true)
      done();
    })
  })

  it('should post a new frenchie', (done) => {
    request('localhost:3000')
    .post('/frenchie')
    .send({name:"joe", age:6})
    .end((err,res) => {
      expect(err).to.eql(null)
      expect(res.body.name).to.eql('joe')
      expect(res.body).to.have.property('_id')
      done();
    })
  })
  describe('need data to test', () => {
    let testFrenchie;
    beforeEach((done) => {
      let newFrenchie = new Frenchies ({name:'testy', dogWalkers_bitten: 7})
      newFrenchie.save((err, frenchie) => {
        testFrenchie = frenchie;
        done();
      })
    })
    it('should update a frenchie', () => {
      request('localhost:3000')
      .put('/frenchie')
      .send(testFrenchie)
      .end((err,res) => {
        expect(err).to.eql(null)
        expect(res.body.message).to.eql('successfully updated Frenchie')
      })
    })
    it('should delete a frenchie', () => {
      request('localhost:3000')
      .delete('/frenchie/' + testFrenchie._id)
      .end((err,res) => {
        expect(err).to.eql(null)
        expect(res.body.message).to.eql('Deleted Frenchie')
      })
    })
  })
})

describe('Dogwalkers Test', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
  it('should get list of dogwalkers', (done) => {
    request('localhost:3000')
    .get('/dogwalkers')
    .end((err,res) => {
      expect(err).to.eql(null)
      expect(Array.isArray(res.body)).to.eql(true)
      done();
    })
  })
  it('should post new dogwalker', (done) => {
    request('localhost:3000')
    .post('/dogwalkers')
    .send({name:'harry', dogs_died:8})
    .end((err,res) => {
      expect(err).to.eql(null)
      expect(res.body.name).to.eql('harry')
      done();
    })
  })
  describe('dogwalker test that need data', () => {
    let testDogwalker;
    beforeEach((done) => {
      let newDogwalker = new DogWalkers({name:'french', dogs_died:5})
      newDogwalker.save((err,dogwalker) => {
        testDogwalker = dogwalker
        done();
      })
    })
    it('should update a dogwalker', (done) => {
      request('localhost:3000')
      .put('/dogwalkers')
      .send(testDogwalker)
      .end((err,res) => {
        expect(err).to.eql(null)
        expect(res.body.message).to.eql('you have successfully updated the dogwalkers')
        done();
      })
    })

    it('should delete a dogwalker', (done) => {
      request('localhost:3000')
      .delete('/dogwalkers/' + testDogwalker._id)
      .end((err,res) => {
        expect(err).to.eql(null)
        expect(res.body.message).to.eql('Successfully deleted a dogwalker')
        done();
      })
    })
  })


})

  describe('error test', () => {
    it('should get an error status with bad path', (done) => {
      request('localhost:3000')
      .get('/error')
      .end((err,res) => {
        expect(res).to.have.status(404)
        done();
      })
    })
  })

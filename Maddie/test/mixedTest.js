'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP)

const Frenchie = require('../schema/frenchies.js')
const Dogwalkers = require('../schema/dogWalkers.js')
const mongoose = require('mongoose')

const expect = chai.expect
const request = chai.request
const dbPort = process.env.MONGOLAB_URI

process.env.MONGOLAB_URI = 'mongodb://localhost/3000/test'
require('../server.js')

describe('Non-crud endpoint', () => {
  let testFrenchie;
  let testDogwalker;
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
  beforeEach((done) => {
    let newFrenchie = new Frenchie({dogWalkers_bitten: 6})
    newFrenchie.save((err,frenchie) => {
      testFrenchie = frenchie;

    })

    let newDogWalker = new Dogwalkers({dogs_died: 10})
    newDogWalker.save((err,dogwalker) => {
        testDogwalker = dogwalker
        done();

    });
  })

  it('should compare the two totals, and respond with bigger value', (done) => {
      request('localhost:3000')
      .get('/unfortunate')
      .end((err,res) => {
        expect(err).to.eql(null)
        expect(res.text).to.eql('"A dog has died"')
        done();
      })
  })
})

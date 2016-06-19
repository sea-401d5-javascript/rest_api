'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const NflPlayer = require('../model/nfl');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('NFL tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should get a list of NFL players', (done) => {
    request('localhost:3000')
    .get('/nflPlayers/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });
  it('should create an NFL player', (done) => {
    request('localhost:3000')
    .post('/nflPlayers/')
    .send({name: 'post player', active: false})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('post player');
      expect(res.body).to.have.property('_id');
      expect(res.body.championships).to.eql(0);
      expect(res.body.active).to.eql(false);
      done();
    });
  });
  describe('tests that need players', (done) => {
    let testPlayer;
    beforeEach((done) => {
      let newPlayer = new NflPlayer({name: 'test', active: true, weight: 250});
      newPlayer.save((err, nflPlayers) => {
        testPlayer = nflPlayers;
        done();
      });
    });
      it('should update a player', (done) => {
        testPlayer.name = 'updated';
        request('localhost:3000')
        .put('/nflPlayers/')
        .send(testPlayer)
        .end((err, res) => {
          console.log('res', res.body);
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated')
          done();
        });
      });
      it('should delete a player', (done) => {
        request('localhost:3000')
        .delete('/nflPlayers/' + testPlayer._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
      });
      it('should find the average weight of all NFL players', (done) => {
        request('localhost:3000')
        .get('/nflPlayers/average-weight')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(typeof res.body.avgWeight).to.eql('number');
          done();
        });
      });
    });
  });

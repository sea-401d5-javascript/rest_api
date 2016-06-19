'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const NbaPlayer = require('../model/nba');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('NBA tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should get a list of NBA players', (done) => {
    request('localhost:3000')
    .get('/nbaPlayers/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });
  it('should create an NBA player', (done) => {
    request('localhost:3000')
    .post('/nbaPlayers/')
    .send({name: 'post player', active: false, height: 76, championships: 0})
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
      let newPlayer = new NbaPlayer({name: 'test', active: true, height: 76});
      newPlayer.save((err, nbaPlayers) => {
        testPlayer = nbaPlayers;
        done();
      });
    });
      it('should update a player', (done) => {
        testPlayer.name = 'updated';
        request('localhost:3000')
        .put('/nbaPlayers/')
        .send(testPlayer)
        .end((err, res) => {
          console.log('res', res.body);
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated')
          done();
        });
      });
      it('should delete player', (done) => {
        request('localhost:3000')
        .delete('/nbaPlayers/' + testPlayer._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
      });
      it('should get the average height of all NBA players', (done) => {
        request('localhost:3000')
        .get('/nbaPlayers/average-height/')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body._id).to.eql(null);
          expect(typeof res.body.avgHeight).to.eql('number');
          done();
        });
      });
    });
  });

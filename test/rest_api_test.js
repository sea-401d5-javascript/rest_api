'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const ManUnitedPlayer = require('../schema/man_United_Player');
const BarcaPlayer = require('../schema/barca_Player');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Router tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  describe('Man United Tests', () => {
    it('should get a list of Man United players', (done) => {
      request('localhost:6969')
      .get('/manUnited')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
    it('Should create a Man United player', (done) => {
      request('localhost:6969')
      .post('/manUnited')
      .send({name: 'test player'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to. eql('test player');
        done();
      });
    });

    describe('Man United test that need data', (done) => {
      let testManUPlayer;
      beforeEach((done) => {
        let newManUPlayer = new ManUnitedPlayer({name: 'test'})
        newManUPlayer.save((err, player) => {
          testManUPlayer = player;
          done();
        });
      });

      it('Should update a Man U player', (done) => {
        testManUPlayer.name = 'updated';
        request('localhost:6969')
        .put('/manUnited')
        .send(testManUPlayer)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
      });

      it('Should delete a Man U player', (done) => {
        request('localhost:6969')
        .delete('/manUnited/' + testManUPlayer.id)
        .end((err,res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
      });
    });
  });
});

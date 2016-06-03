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
      .send({name: 'test player', goals: 40})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to. eql('test player');
        done();
      });
    });

    describe('Man United tests that need data', () => {
      let testManUPlayer;
      beforeEach((done) => {
        let newManUPlayer = new ManUnitedPlayer({name: 'test', goals:20});
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

  describe('Barca Tests', () => {
    it('should get a list of Barca players', (done) => {
      request('localhost:6969')
      .get('/barca')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
    it('Should create a Barca player', (done) => {
      request('localhost:6969')
      .post('/barca')
      .send({name: 'test player', goals: 100})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to. eql('test player');
        done();
      });
    });

    describe('Barca tests that need data', () => {
      let testBarcaPlayer;
      beforeEach((done) => {
        let newBarcaPlayer = new BarcaPlayer({name: 'test', goals: 100});
        newBarcaPlayer.save((err, player) => {
          testBarcaPlayer = player;
          done();
        });
      });

      it('Should update a Barca player', (done) => {
        testBarcaPlayer.name = 'updated';
        request('localhost:6969')
        .put('/barca')
        .send(testBarcaPlayer)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
      });

      it('Should delete a Barca player', (done) => {
        request('localhost:6969')
        .delete('/barca/' + testBarcaPlayer.id)
        .end((err,res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
      });
    });
  });

  describe('Compare tests', () => {

    it('Should compare total goals of each team', (done) => {
      request('localhost:6969')
      .get('/compare/mostGoals')
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql('Barcalona players scored 200 goals, which is more than Man United Players.');
        done();
      });
    });
  });
});

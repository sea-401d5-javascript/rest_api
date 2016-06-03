'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const Weasel = require('../schema/weasel');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGODB_URI;

process.env.MONGODB_URI = 'mongodb://localhost/test_db';
require('../lib/server');

describe('Weasel tests', ()=>{
  after((done)=>{
    process.env.MONGODB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=>{
      done();
    });
  });
  it('should get a list of weasels', (done)=>{
    request('localhost:2222')
      .get('/weasels')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        done();
      });
  });
  it('should post a new weasel', (done)=>{
    let drew = {name: 'Business Drew', strength: 2};
    request('localhost:2222')
      .post('/weasels/')
      .send(drew)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Business Drew');
        expect(res.body.snakeKiller).to.be.true;
        expect(res.body.strength).to.eql(2);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('Weasel tests with data', ()=>{
    let testWeasel;
    beforeEach((done)=>{
      let aWeasel = new Weasel({name:'testi', size: 1});
      aWeasel.save((err, weasel)=>{
        testWeasel = weasel;
        done();
      });
    });
    it('should update a weasel', (done)=>{
      testWeasel.name = 'Carl';
      request('localhost:2222')
        .put('/weasels/')
        .send(testWeasel)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('Update successful');
          done();
        });
    });

    it('should destroy a weasel', (done)=>{
      testWeasel.name = 'Carl';
      request('localhost:2222')
        .delete('/weasels/' + testWeasel.id)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('Deletion successful');
          done();
        });
    });
  });
});

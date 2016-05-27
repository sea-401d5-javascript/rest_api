'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const Snake = require('../schema/snake');
const mongoose = require('mongoose')
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db'
require('../lib/server');

describe('Snake tests', ()=>{
  after((done)=>{
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=>{
      done();
    })
  })
  it('should get a list of snakes', (done)=>{
    request('localhost:2222')
      .get('/snakes/')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        done();
      });
  });
  it('should post a new snake', (done)=>{
    let vic = {name: 'Vicnasty', size: 2};
    request('localhost:2222')
      .post('/snakes/')
      .send(vic)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Vicnasty');
        expect(res.body.weaselKiller).to.be.true;
        expect(res.body.size).to.eql(2);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('Snake tests with data', ()=>{
    let testSnake;
    beforeEach((done)=>{
      let aSnake = new Snake({name:'testi', size: 1});
      aSnake.save((err, snake)=>{
        testSnake = snake;
        done();
      });
    });
    it('should update a snake', (done)=>{
      testSnake.name = 'Carl';
      request('localhost:2222')
        .put('/snakes/')
        .send(testSnake)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('Update successful');
          done();
        });
    });

    it('should destroy a snake', (done)=>{
      testSnake.name = 'Carl';
      request('localhost:2222')
        .delete('/snakes/' + testSnake.id)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('Deletion successful');
          done();
        })
    })
  });
});

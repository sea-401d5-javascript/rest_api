/*jshint esversion:6*/
/*eslint-env es6*/

const chai = require('chai');
const chaihttp = require('chai-http');
const Candy = require('../schema/candy');
const mongoose = require('mongoose');
chai.use(chaihttp);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Non-data candy tests',() => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=> {
      done();
    });
  });

  it('should get a list of candy',(done)=> {
    request('localhost:3000')
    .get('/candy')
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should produce/create candy',(done)=> {
    request('localhost:3000')
    .post('/candy')
    .send({name:'licorice',edible:true})
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('licorice');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
});


describe('Data reliant candy tests', () => {
  var experimentalCandy;
  beforeEach((done)=> {
    var deathCandy = new Candy({name:'CandyX',edible:false});
    deathCandy.save((err,candy)=> {
      experimentalCandy = candy;
      done();
    });
  });
  it('should update candy',(done)=> {
    experimentalCandy.edible = true;
    request('localhost:3000')
    .put('/candy')
    .send(experimentalCandy)
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Candy updated!');
      done();
    });
  });

  it('should nom nom/delete candy',(done)=> {
    request('localhost:3000')
    .delete('/candy/'+experimentalCandy._id)
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Candy eaten!');
      done();
    });
  });
});

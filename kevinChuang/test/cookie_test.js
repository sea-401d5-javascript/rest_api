/*jshint esversion:6*/
/*eslint-env es6*/

const chai = require('chai');
const chaihttp = require('chai-http');
const Cookie = require('../schema/cookie');
const mongoose = require('mongoose');
chai.use(chaihttp);

const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Non-data cookie tests',() => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(()=> {
      done();
    });
  });

  it('should get a list of delicious cookies',(done)=> {
    request('localhost:3000')
    .get('/cookies')
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should bake/create cookies',(done)=> {
    request('localhost:3000')
    .post('/cookies')
    .send({name:'White Chocolate',edible:true})
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('White Chocolate');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
});


describe('Data reliant cookie tests', () => {
  var experimentalCookie;
  beforeEach((done)=> {
    var questionableCookie = new Cookie({name:'Triple Sausage Cream Cheese Jalapeno Surprise',edible:false});
    questionableCookie.save((err,res)=> {
      experimentalCookie = questionableCookie;
      done();
    });
  });
  it('should update candy',(done)=> {
    console.log('before',experimentalCookie);
    experimentalCookie.edible = true;
    request('localhost:3000')
    .put('/cookies')
    .send(experimentalCookie)
    .end((err,res)=> {
      console.log('after',res);
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Cookie updated!');
      done();
    });
  });

  it('should nom nom/delete cookie',(done)=> {
    request('localhost:3000')
    .delete('/cookies/'+experimentalCookie._id)
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Cookie eaten!');
      done();
    });
  });
});

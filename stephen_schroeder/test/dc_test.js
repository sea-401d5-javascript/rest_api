const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');

process.env.MONGOLABL_URI = 'mongodb://localhost/dc_app_test';
const server = require(__dirname + '/../server');
const DC = require(__dirname + '/../schema/dc');

describe('The DC API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all DC characters', (done) => {
    request('localhost:3000')
    .get('/api/dc')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should create a sith with a POST', (done) => {
    request('localhost:3000')
    .post('/api/dc')
    .send({ name: 'Superman' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Superman');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  describe('rest requests that require a DC character is already in db', () => {

    beforeEach((done) => {
      DC.create({ name: 'test-beforeEach' }, (err, data) => {
        this.testDC = data;
        done();
      });
    });

    it('shoud be able to update a DC character', (done) => {
      request('localhost:3000')
      .put('/api/dc/' + this.testDC._id)
      .send({ name: 'new-test-beforeEach' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a DC character', (done) => {
      request('localhost:3000')
      .delete('/api/dc/' + this.testDC._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');

process.env.MONGOLABL_URI = 'mongodb://localhost/marvel_app_test';
const server = require(__dirname + '/../server');
const Marvel = require(__dirname + '/../schema/marvel');

describe('The Marvel API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all Marvel', (done) => {
    request('localhost:3000')
    .get('/api/marvel')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should create a marvel character with a POST', (done) => {
    request('localhost:3000')
    .post('/api/marvel')
    .send({ name: 'Thor' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Thor');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  describe('rest requests that require a marvel character already in db', () => {

    beforeEach((done) => {
      Marvel.create({ name: 'test-beforeEach' }, (err, data) => {
        this.testMarvel = data;
        done();
      });
    });

    it('shoud be able to update a Marvel character', (done) => {
      request('localhost:3000')
      .put('/api/marvel/' + this.testMarvel._id)
      .send({ name: 'new-test-beforeEach' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a Marvel character', (done) => {
      request('localhost:3000')
      .delete('/api/marvel/' + this.testMarvel._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });
  });
});

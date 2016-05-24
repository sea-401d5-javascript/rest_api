const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const expect    = chai.expect;
chai.use(chaiHTTP);
const request   = chai.request;
const crud      = require(__dirname + '/../../crud.js');

describe('crud app test', () => {
  it('should hit the GET stuff route', (done) => {
    request('localhost:8008/things')
    .get('/stuff')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'STUFF'});
      done();
    });
  });
  it('should hit the POST route', (done) => {
    request('localhost:8008/things')
    .post('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({name: 'Jason'});
      done();
    });
  });
  it('should hit the PUT water route', (done) => {
    request('localhost:8008/things')
    .put('/water')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'The record at water has been changed to BEERZ.'});
      done();
    });
  });
  it('should hit the PATCH hacker route', (done) => {
    request('localhost:8008/things')
    .patch('/hacker')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'The record at hacker has been changed to hackerx1000.'});
      done();
    });
  });
  it('should hit the DELETE secret route', (done) => {
    request('localhost:8008/things')
    .delete('/secret')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'There is no secret... wink, wink.'});
      done();
    });
  });
  it('should give a 404 message for a bad path', () => {
    request('localhost:8008')
    .get('/turd')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(JSON.parse(res.text)).to.eql({message: 'NOT FOUND'});
    });
  });
});

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const expect    = chai.expect;
chai.use(chaiHTTP);
const request   = chai.request;
const crud      = require(__dirname + '/../lib/server');

describe('crud app test', () => {
  it('should hit the GET route', (done) => {
    request('localhost:3000/tNails')
    .get('/hrpuffinSTUFF')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'hrpuffinSTUFF'});
      done();
    });
  });
  it('should hit the POST route', (done) => {
    request('localhost:3000/tNails')
    .post('/')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({name: 'Confederacy of Dunces'});
      done();
    });
  });
  it('should hit the PUT route', (done) => {
    request('localhost:3000/tNails')
    .put('/dirty')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'file dirty has been changed'});
      done();
    });
  });
  it('should hit the PATCH route', (done) => {
    request('localhost:3000/tNails')
    .patch('/cracked')
    .send({})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'the file cracked has been changed'});
      done();
    });
  });
  it('should hit the DELETE route', (done) => {
    request('localhost:3000/tNails')
    .delete('/strawberry')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text)).to.eql({message: 'the file strawberry has been removed'});
      done();
    });
  });
  it('should give a 404 message for a bad path', () => {
    request('localhost:3000')
    .get('/turd')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(JSON.parse(res.text)).to.eql({message: 'NOT FOUND'});
    });
  });
});

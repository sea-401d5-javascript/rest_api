'use strict';

var expect = require('chai').expect;
var request = require(__dirname + '/../request.js');

describe('request routes', function() {
  describe('get route', function() {
    it('returns request read', function() {
      expect(request.get('/request')).to.be(201);
    });
  });
});

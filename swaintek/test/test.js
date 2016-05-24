'use strict';

var expect = require('chai').expect;
var request = require(__dirname + '/../request.js');

describe('request routes', function() {
  describe('get route', function() {
    it('returns request read', function() {
      request.get('/request').expect(201);
    });
  });
});

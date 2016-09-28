var expect = require('chai').expect;
var request = require('request');

describe('Server Tests', function() {
  describe('GET request to home page', function() {
    it('Should receive a 200 response code for a GET request to the home page.', function(done) {
    	request
    	  .get('http://127.0.0.1:8000')
    	  .on('response', function(response) {
          expect(response.statusCode).to.equal(200);
          done();
    	  });
    });
  });

  describe('GET request for an unknown route', function() {
    it('Should receive a 404 response code for a GET request to an unknown route.', function(done) {
      request
        .get('http://127.0.0.1:8000/random')
        .on('response', function(response) {
          expect(response.statusCode).to.equal(404);
          done();
        });
    });
  });
});

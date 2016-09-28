const expect = require('chai').expect;
const request = require('request');

describe('Server Tests', () => {
  // describe('GET request to home page', () => {
  //   it('Should receive a 200 response code for a GET request to the home page.', (done) => {
  //     request
  //       .get('http://127.0.0.1:8000')
  //       .on('response', (response) => {
  //         expect(response.statusCode).to.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('GET request for an unknown route', () => {
  //   it('Should receive a 404 response code for a GET request to an unknown route.', (done) => {
  //     request
  //       .get('http://127.0.0.1:8000/random')
  //       .on('response', (response) => {
  //         expect(response.statusCode).to.equal(404);
  //         done();
  //       });
  //   });
  // });

  describe('TEST', () => {
    it('Shoud return true', (done) => {
      return true;
    });
  });
});

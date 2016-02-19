'use strict';

const Client = require('../../lib/client');

const chai = require('chai');
const expect = chai.expect;

describe('Client', () => {
  describe('constructor', () => {
    it('should throw an exception if parameters are missing', () => {
      expect(() => new Client()).to.throw();
      expect(() => new Client('abc')).to.throw();
      expect(() => new Client(null, 'abc')).to.throw();
    });

    it('should return a properly formed instance of Client', () => {
      let client = new Client('foo', 123);
      expect(client).to.be.an.instanceof(Client);
      expect(client.investorId).to.equal(123);
    });
  });
});

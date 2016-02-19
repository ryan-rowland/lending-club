'use strict';

const AccountsResource = require('./resource/accounts');
const LoansResource = require('./resource/loans');
const mozart = require('mozart');
const path = require('path');

const Client = mozart('Client', function (prototype, _, _protected) {
  prototype.init = function(apiKey, investorId) {
    if (typeof apiKey !== 'string' || typeof investorId !== 'number') {
      throw new Error('<String>apiKey and <Number>investorId are mandatory parameters');
    }
    
    const accountsResource = new AccountsResource(apiKey, investorId.toString());
    const loansResource = new LoansResource(apiKey, investorId.toString());

    Object.defineProperties(this, {
      accounts: {
        enumerable: true,
        value: accountsResource
      },
      investorId: {
        enumerable: true,
        value: investorId
      },
      loans: {
        enumerable: true,
        value: loansResource
      },
    });
  };
});

module.exports = Client;


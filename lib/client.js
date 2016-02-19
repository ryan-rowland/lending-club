'use strict';

const AccountsResource = require('./resource/accounts');
const mozart = require('mozart');
const path = require('path');

const Client = mozart('Client', function (prototype, _, _protected) {
  prototype.init = function(apiKey, investorId) {
    if (!apiKey || !investorId) {
      throw new Error('apiKey and investorId are mandatory parameters');
    }
    
    const accountsResource = new AccountsResource(apiKey, investorId);

    Object.defineProperties(this, {
      accounts: {
        enumerable: true,
        value: accountsResource
      },
      investorId: {
        enumerable: true,
        value: investorId
      }
    });
  };
});

module.exports = Client;


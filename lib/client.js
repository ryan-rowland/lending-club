'use strict';

const AccountsResource = require('./resource/accounts');
const C = require('./constants');
const LoansResource = require('./resource/loans');

class Client {
  constructor(apiKey, investorId) {
    if (typeof apiKey !== 'string' || typeof investorId !== 'number') {
      throw new Error('<String>apiKey and <Number>investorId are mandatory parameters');
    }

    const accountsResource = new AccountsResource(apiKey, investorId.toString());
    const loansResource = new LoansResource(apiKey, investorId.toString());

    Object.defineProperties(this, {
      account: {
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
      }
    });
  };
}

Client.C = C;

module.exports = Client;


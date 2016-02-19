'use strict';

const Client = require('./client.js');

function LendingClub() {

}

LendingClub.open = function open(apiKey, investorId) {
  const client = new Client(apiKey, investorId);
  return client.connect();
};

module.exports = LendingClub;

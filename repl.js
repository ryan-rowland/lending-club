'use strict';

let report = function(promise) {
  promise.then(
    (value) => console.info('Fulfilled:', value),
    (reason) => console.info('Rejected:', reason));
};

let reload = function() {
  global.client = (function() {
    let credentials = require('./test/credentials.json');
    let Client = require('./lib/client');
    return new Client(credentials.apiKey, credentials.investorId);
  })();
};

reload();


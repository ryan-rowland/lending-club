'use strict';

const mozart = require('mozart');
const request = require('request-promise');
const url = require('url');

const Resource = mozart('Resource', function (prototype, _, _protected) {
  prototype.init = function(basePath, apiKey, investorId) {
    _(this).basePath = basePath || '';
    _(this).baseUrl = 'https://api.lendingclub.com/api/investor/v1/';

    _(this).headers = {
      Authorization: apiKey,
      Accept: 'application/json'
    };

    _(this).investorId = investorId;
  };

  function _request(method, subresource) {
    return request.get({
      uri: _(this).generateUri(subresource),
      headers: _(this).headers
    }).then((response) => {
      try {
        return JSON.parse(response);
      } catch (e) {
        throw new Error('Received non-JSON response.');
      }
    });
  };

  _protected.get = function get(subresource) {
    return _request.call(this, 'get', subresource);
  };

  _protected.post = function post(subresource) {
    return _request.call(this, 'post', subresource);
  };

  _protected.generateUri = function generateUri(subresource) {
    return url.resolve(_(this).baseUrl, _(this).basePath, subresource);
  };
});

module.exports = Resource;


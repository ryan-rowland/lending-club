'use strict';

const mozart = require('mozart');
const path = require('path');
const request = require('request');
const url = require('url');

const Resource = mozart('Resource', function(prototype, _, _protected) {
  prototype.init = function(basePath, apiKey, investorId) {
    _(this).basePath = basePath || '';
    _(this).baseUrl = 'https://api.lendingclub.com/api/investor/v1/';

    _(this).headers = {
      'Authorization': apiKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    _(this).investorId = investorId;
  };

  function _request(method, subresource, body) {
    const options = {
      uri: url.resolve(_(this).baseUrl, _(this).generatePath(subresource)),
      headers: _(this).headers,
      method: method.toUpperCase()
    };

    if (body) {
      options.body = body;
      options.json = true;
      options.headers['content-type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
      request(options, (err, res) => {
        if (err) { return reject(err); }

        try {
          return resolve(JSON.parse(res.body));
        } catch (e) {
          return resolve(res.body);
        }
      });
    });
  }

  _protected.generatePath = function generatePath(subresource) {
    return path.join(_(this).basePath, subresource);
  };

  _protected.get = function get(subresource) {
    return _request.call(this, 'get', subresource);
  };

  _protected.post = function post(subresource, body) {
    return _request.call(this, 'post', subresource, body);
  };
});

module.exports = Resource;


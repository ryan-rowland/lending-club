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
    return Object.freeze(this);
  };

  function _request(method, subresource, reqBody) {
    const options = {
      uri: url.resolve(_(this).baseUrl, _(this).generatePath(subresource)),
      headers: _(this).headers,
      method: method.toUpperCase()
    };

    if (reqBody) {
      options.body = reqBody;
      options.json = true;
      options.headers['content-type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
      request(options, (err, res, resBody) => {
        if (err) { return reject(err); }

        try {
          resBody = (typeof resBody === 'string') ? JSON.parse(resBody) : resBody;
        } catch (e) {
          return reject(new Error('Received malformed JSON string'));
        }

        if (res.statusCode === 400) {
          return reject(resBody);
        }

        return resolve(resBody);
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


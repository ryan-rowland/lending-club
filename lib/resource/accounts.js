'use strict';

const mozart = require('mozart');
const path = require('path');
const request = require('request-promise');
const Resource = require('./index');
const url = require('url');

const AccountsResource = Resource.subclass('AccountsResource', function(prototype, _, _protected) {
  prototype.init = function init(apiKey, investorId) {
    prototype.super.init.call(this, 'accounts', apiKey, investorId);
  };

  _protected.generateUri = function generateUri(subresource) {
    const subresourcePath = path.join(_(this).basePath, _(this).investorId, subresource);
    return url.resolve(_(this).baseUrl, subresourcePath);
  };

  prototype.getSummary = function() {
    return _(this).get('summary');
  };
});

module.exports = AccountsResource;


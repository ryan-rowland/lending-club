'use strict';

const mozart = require('mozart');
const path = require('path');
const request = require('request-promise');
const Resource = require('./index');

const LoansResource = Resource.subclass('LoansResource', function(prototype, _, _protected) {
  prototype.init = function init(apiKey, investorId) {
    prototype.super.init.call(this, 'loans', apiKey, investorId);
  };

  prototype.getAll = function() {
    return _(this).get('listing?showAll=true').then((res) => res.loans || []);
  };

  prototype.getNew = function() {
    return _(this).get('listing').then((res) => res.loans || []);
  };
});

module.exports = LoansResource;


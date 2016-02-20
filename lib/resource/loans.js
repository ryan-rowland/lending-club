'use strict';

const Resource = require('./index');

const LoansResource = Resource.subclass('LoansResource', function(prototype, _) {
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


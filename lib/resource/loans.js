'use strict';

const Loan = require('../loan');
const Resource = require('./index');

/**
 * Represents LendingClub's `/Loans` resource.
 * @class
 */
const LoansResource = Resource.subclass('LoansResource', function(prototype, _) {
  prototype.init = function init(apiKey, investorId) {
    return prototype.super.init.call(this, 'loans', apiKey, investorId);
  };

  function createLoansFromResponse(res) {
    return res.loans ? res.loans.map((loan) => new Loan(loan)) : [];
  }

  /**
   * Get a list of all listed loans open for funding.
   *
   * https://www.lendingclub.com/developers/listed-loans.action
   * @returns {Promise.<Array.<Loan>>} loans
   */
  prototype.getAllListings = function() {
    return _(this).get('listing?showAll=true').then(createLoansFromResponse);
  };

  /**
   * Get a list of loans open for funding that were added
   * in the last batch of listed loans.
   *
   * https://www.lendingclub.com/developers/listed-loans.action
   * @returns {Promise.<Array.<Loan>>} loans
   */
  prototype.getNewListings = function() {
    return _(this).get('listing').then(createLoansFromResponse);
  };

  Object.freeze(prototype);
  this.final();
});

module.exports = Object.freeze(LoansResource);


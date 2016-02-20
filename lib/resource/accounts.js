'use strict';

const path = require('path');
const Resource = require('./index');

const AccountsResource = Resource.subclass('AccountsResource', function(prototype, _, _protected) {
  prototype.init = function init(apiKey, investorId) {
    prototype.super.init.call(this, 'accounts', apiKey, investorId);
  };

  _protected.generatePath = function generatePath(subresource) {
    return path.join(_(this).basePath, _(this).investorId, subresource);
  };

  prototype.getSummary = function() {
    return _(this).get('summary');
  };

  prototype.getAvailableCash = function() {
    return _(this).get('availablecash').then((res) => res.availableCash);
  };

  prototype.getPendingTransfers = function() {
    return _(this).get('funds/pending').then((res) => res.transfers || []);
  };

  prototype.getNotes = function() {
    return _(this).get('notes').then((res) => res.myNotes || []);
  };

  prototype.getDetailedNotes = function() {
    return _(this).get('detailednotes').then((res) => res.myNotes || []);
  };

  prototype.getPortfolios = function() {
    return _(this).get('portfolios').then((res) => res.myPortfolios || []);
  };

  prototype.cancelTransfers = function(transferIds) {
    return _(this).post('funds/cancel', { transferIds })
      .then((res) => res.cancellationResults);
  };

  function _addFunds(options, transferFrequency) {
    transferFrequency = transferFrequency || (options.startDate ? 'LOAD_ONCE' : 'LOAD_NOW');
    return _(this).post('funds/add', {
      amount: options.amount,
      startDate: options.startDate,
      endDate: options.endDate,
      transferFrequency
    }).then((res) => res.estimatedFundsTransferDate);
  }

  prototype.addFunds = function(amount, startDate) {
    return _addFunds.call(this, { amount, startDate });
  };

  prototype.addFundsWeekly = function(amount, startDate, endDate) {
    return _addFunds.call(this, { amount, startDate, endDate }, 'LOAD_WEEKLY');
  };

  prototype.addFundsBiweekly = function(amount, startDate, endDate) {
    return _addFunds.call(this, { amount, startDate, endDate }, 'LOAD_BIWEEKLY');
  };

  prototype.addFundsMonthly = function(amount, startDate, endDate) {
    return _addFunds.call(this, { amount, startDate, endDate }, 'LOAD_MONTHLY');
  };

  prototype.withdrawFunds = function(amount) {
    return _(this).post('funds/withdraw', { amount })
      .then((res) => res.estimatedFundsTransferDate);
  };

  prototype.addPortfolio = function(portfolioName, portfolioDescription) {
    const aid = _(this).investorId;
    return _(this).post('portfolios', { portfolioName, portfolioDescription, aid })
      .then((res) => res.portfolioId);
  };

  prototype.submitOrders = function(orders) {
    const aid = _(this).investorId;
    return _(this).post('orders', { orders, aid })
      .then((res) => res.orderConfirmations);
  };
});

module.exports = AccountsResource;


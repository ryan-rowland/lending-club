'use strict';

const C = require('../constants');
const path = require('path');
const Resource = require('./index');

/**
 * Represents LendingClub's `/accounts` resource.
 * @class
 */
const AccountsResource = Resource.subclass('AccountsResource', function(prototype, _, _protected) {
  prototype.init = function init(apiKey, investorId) {
    return prototype.super.init.call(this, 'accounts', apiKey, investorId);
  };

  _protected.generatePath = function generatePath(subresource) {
    return path.join(_(this).basePath, _(this).investorId, subresource);
  };

  /**
   * Get the account summary.
   * https://www.lendingclub.com/developers/summary.action
   * @returns {Promise.<Object>} accountSummary
   */
  prototype.getSummary = function() {
    return _(this).get('summary');
  };

  /**
   * Get the amount of available cash in the account.
   * https://www.lendingclub.com/developers/available-cash.action
   * @returns {Promise.<Number>} availableCash
   */
  prototype.getAvailableCash = function() {
    return _(this).get('availablecash').then((res) => res.availableCash);
  };

  /**
   * Get a list of the account's currently pending transfers.
   * https://www.lendingclub.com/developers/pending-transfers.action
   * @returns {Promise.<Array.<Object>>} pendingTransfers
   */
  prototype.getPendingTransfers = function() {
    return _(this).get('funds/pending').then((res) => res.transfers || []);
  };

  /**
   * Get a list of the account's owned notes with less detail.
   * https://www.lendingclub.com/developers/notes-owned.action
   * @returns {Promise.<Array.<Object>>} myNotes
   */
  prototype.getNotes = function() {
    return _(this).get('notes').then((res) => res.myNotes || []);
  };

  /**
   * Get a list of the account's owned notes with more detail.
   * https://www.lendingclub.com/developers/detailed-notes-owned.action
   * @returns {Promise.<Array.<Object>>} myDetailedNotes
   */
  prototype.getDetailedNotes = function() {
    return _(this).get('detailednotes').then((res) => res.myNotes || []);
  };

  /**
   * Get a list of the account's portfolios.
   * https://www.lendingclub.com/developers/portfolios-owned.action
   * @returns {Promise.<Array.<Object>>} myPortfolios
   */
  prototype.getPortfolios = function() {
    return _(this).get('portfolios').then((res) => res.myPortfolios || []);
  };

  /**
   * Cancel pending or recurring transfers by Id.
   * https://www.lendingclub.com/developers/cancel-transfers.action
   * @param {Array.<Number>|Number} transferIds - A TransferID or
   *   an Array of TransferIDs.
   * @returns {Promise.<Array.<Object>>} cancellationResults
   */
  prototype.cancelTransfers = function(transferIds) {
    if (typeof transferIds === 'number') {
      transferIds = [transferIds];
    }

    if (typeof transferIds.forEach !== 'function') {
      throw new Error('<Array|Number>transferIds is a mandatory parameter');
    }

    return _(this).post('funds/cancel', { transferIds })
      .then((res) => res.cancellationResults);
  };

  function _addFunds(options, transferFrequency) {
    if (typeof options.amount !== 'number') {
      throw new Error('<Number>amount is a required parameter');
    }

    if (options.startDate && options.startDate < Date.now()) {
      throw new Error('<Date>startDate must be in the future');
    }

    if (options.endDate && options.endDate < Date.now()) {
      throw new Error('<Date>endDate must be in the future');
    }

    if (options.startDate && options.endDate && options.endDate < options.startDate) {
      throw new Error('<Date>endDate must be later than <Date>startDate');
    }

    transferFrequency = transferFrequency || (options.startDate ? C.ONCE : C.NOW);
    return _(this).post('funds/add', {
      amount: options.amount,
      startDate: options.startDate,
      endDate: options.endDate,
      transferFrequency
    }).then((res) => new Date(res.estimatedFundsTransferDate));
  }

  /**
   * Initiate a one-time transfer of funds from the account's linked
   * bank account into the account. If no date is specified, the
   * transfer will be started immediately.
   * https://www.lendingclub.com/developers/add-funds.action
   * @param {Number} amount - Amount of cash to transfer to the account.
   * @param {?Date} startDate - An optional Date representing a time in the
   *   future to execute this transfer.
   * @returns {Promise.<Date>} estimatedFundsTransferDate - A Date returned
   *   from the LC server representing the estimated date and time this
   *   transfer will execute.
   */
  prototype.addFundsOnce = function(amount, startDate) {
    return _addFunds.call(this, { amount, startDate });
  };

  /**
   * Set up a recurring transfer of funds from the account's linked
   * bank account into the account. If no date is specified, the
   * transfers will be started immediately.
   *   NOTE: Currently, only one recurring transfer can be set up at
   *   a time. The server will reject this action if the account
   *   already has a recurring transfer.
   * https://www.lendingclub.com/developers/add-funds.action
   * @param {Enum} frequency - How often to transfer into the account.
   *   Valid Options are:
   *     - LC.C.WEEKLY
   *     - LC.C.BIWEEKLY
   *     - LC.C.MONTHLY
   * @param {Number} amount - Amount of cash to transfer to the account.
   * @param {?Date} startDate - An optional Date representing a time in the
   *   future to begin executing this recurring transfer.
   * @param {?Date} endDate - An optional Date representing a time after
   *   (startDate || now) to terminate the recurring transfer.
   * @returns {Promise.<Date>} estimatedFundsTransferDate - A Date returned
   *   from the LC server representing the estimated date and time this
   *   recurring transfer will begin executing.
   */
  prototype.addRecurringFunds = function(frequency, amount, startDate, endDate) {
    if ([C.WEEKLY, C.BIWEEKLY, C.MONTHLY].indexOf(frequency) === -1) {
      throw new Error('<Enum>frequency must be in: [LC.C.WEEKLY, LC.C.BIWEEKLY, LC.C.MONTHLY]');
    }

    return _addFunds.call(this, { amount, startDate, endDate }, frequency);
  };

  /**
   * Withdraw an amount of available funds from the account and into
   * the associated bank account.
   * https://www.lendingclub.com/developers/add-funds.action (See bottom)
   * @param {Number} amount - Amount of cash to withdraw from the account.
   * @returns {Promise.<Date>} estimatedFundsTransferDate - A Date returned
   *   from the LC server representing the estimated date and time the
   *   withdrawal will be executed.
   */
  prototype.withdrawFunds = function(amount) {
    if (typeof amount !== 'number') {
      throw new Error('<Number>amount is a required parameter');
    }

    return _(this).post('funds/withdraw', { amount })
      .then((res) => res.estimatedFundsTransferDate);
  };

  /**
   * Add a new portfolio to the account.
   * https://www.lendingclub.com/developers/create-portfolio.action
   * @param {String} portfolioName - A name for the new portfolio.
   * @param {?String} portfolioDescription - An optional description for
   *   the new portfolio.
   * @returns {Promise.<Number>} portfolioId
   */
  prototype.createPortfolio = function(portfolioName, portfolioDescription) {
    if (typeof portfolioName !== 'string' || !portfolioName.length) {
      throw new Error('<String>portfolioName is a required parameter');
    }

    const aid = _(this).investorId;
    return _(this).post('portfolios', { portfolioName, portfolioDescription, aid })
      .then((res) => parseInt(res.portfolioId, 10));
  };

  /**
   * Submit a set of orders for new notes.
   * https://www.lendingclub.com/developers/submit-order.action
   * @param {Array.<Order>} orders - An array of orders to be submitted
   *   for purchase.
   * @returns {Promise.<Array.<Object>>} orderConfirmations
   */
  prototype.submitOrders = function(orders) {
    if (!orders || orders.forEach !== 'function') {
      throw new Error('<Array>orders is a required parameter');
    }

    const aid = _(this).investorId;
    return _(this).post('orders', { orders, aid })
      .then((res) => res.orderConfirmations);
  };

  Object.freeze(prototype);
  this.final();
});

module.exports = Object.freeze(AccountsResource);


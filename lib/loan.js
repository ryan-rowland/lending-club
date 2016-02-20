'use strict';

const Order = require('./order');

/**
 * A slim wrapper for loans returned by the `loans.getNewListings` and
 * `loans.getAllListings` methods. This class is immutable and
 * adds a sugar function for more intuitive order creation.
 * @class
 */
class Loan {
  constructor(rawLoan) {
    for (let key in rawLoan) {
      Object.defineProperty(this, key, {
        enumerable: true,
        value: rawLoan[key]
      });
    }

    return Object.freeze(this);
  }

  /**
   * Create an order requesting a note for a specified
   * amount of this loan.
   */
  createOrder(requestedAmount, portfolioId) {
    return new Order(this.id, requestedAmount, portfolioId);
  }
}

module.exports = Object.freeze(Loan);


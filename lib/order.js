'use strict';

/**
 * An immutable order to be passed to `account.submitOrders`.
 * An Order represents a requested note in the specified amount
 * of the specified loan.
 * @class
 * @constructor
 * @param {Number} loanId - The ID of the loan to purchase from
 * @param {Number} requestedAmount - The value of the note to be purchased
 * @param {?Number} portfolioId - An optional portfolio ID of
 *   the portfolio to add the resulting note into on success.
 */
class Order {
  constructor(loanId, requestedAmount, portfolioId) {
    Object.defineProperties(this, {
      requestedAmount: {
        enumerable: true,
        value: requestedAmount
      },
      loanId: {
        enumerable: true,
        value: loanId
      },
      portfolioId: {
        enumerable: true,
        value: portfolioId
      }
    });

    return Object.freeze(this);
  }
}

module.exports = Object.freeze(Order);


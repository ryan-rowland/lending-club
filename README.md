# lc-api 0.1.0
A Promise-based Lending Club API for NodeJS

## Example code

This example code will get the entire batch of new listings and
purchase a $25.00 note for each loan that matches our filter.

```javascript
const LC = require('lc-api');
const lc = new LC(credentials.apiKey, credentials.investorId);

lc.loans.getNewListings().then(newLoans => {
  return newLoans
    .filter(loan => ['A', 'B', 'C'].indexOf(loan.grade) !== -1)
    .map(loan => loan.createOrder(25.00));
}).then(orders => lc.account.submitOrders(orders));
```

## You will need:

#### Your API key

You will find your API key on the bottom of [your account page](https://www.lendingclub.com/account/profile.action)

#### Your account number

You will find your account number right below the Annualized Return box on [your summary page](https://www.lendingclub.com/account/summary.action)

## Installation

```
npm install lc-api
```

## API Documentation

#### Coming Soon

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

# API Documentation

These docs are generated from inline documentation.







* * *

## Class: LoansResource
Represents LendingClub's `/Loans` resource.

### LoansResource.getAllListings() 

Get a list of all listed loans open for funding.

https://www.lendingclub.com/developers/listed-loans.action

**Returns**: `Promise.<Array.<Loan>>`, loans

### LoansResource.getNewListings() 

Get a list of loans open for funding that were added

in the last batch of listed loans.
https://www.lendingclub.com/developers/listed-loans.action

**Returns**: `Promise.<Array.<Loan>>`, loans



* * *
















* * *

## Class: AccountsResource
Represents LendingClub's `/accounts` resource.

### AccountsResource.getSummary() 

Get the account summary.

https://www.lendingclub.com/developers/summary.action

**Returns**: `Promise.<Object>`, accountSummary

### AccountsResource.getAvailableCash() 

Get the amount of available cash in the account.

https://www.lendingclub.com/developers/available-cash.action

**Returns**: `Promise.<Number>`, availableCash

### AccountsResource.getPendingTransfers() 

Get a list of the account's currently pending transfers.

https://www.lendingclub.com/developers/pending-transfers.action

**Returns**: `Promise.<Array.<Object>>`, pendingTransfers

### AccountsResource.getNotes() 

Get a list of the account's owned notes with less detail.

https://www.lendingclub.com/developers/notes-owned.action

**Returns**: `Promise.<Array.<Object>>`, myNotes

### AccountsResource.getDetailedNotes() 

Get a list of the account's owned notes with more detail.

https://www.lendingclub.com/developers/detailed-notes-owned.action

**Returns**: `Promise.<Array.<Object>>`, myDetailedNotes

### AccountsResource.getPortfolios() 

Get a list of the account's portfolios.

https://www.lendingclub.com/developers/portfolios-owned.action

**Returns**: `Promise.<Array.<Object>>`, myPortfolios

### AccountsResource.cancelTransfers(transferIds) 

Cancel pending or recurring transfers by Id.

https://www.lendingclub.com/developers/cancel-transfers.action

**Parameters**

**transferIds**: `Array.<Number> | Number`, A TransferID or
  an Array of TransferIDs.

**Returns**: `Promise.<Array.<Object>>`, cancellationResults

### AccountsResource.addFundsOnce(amount, startDate) 

Initiate a one-time transfer of funds from the account's linked
bank account into the account. If no date is specified, the
transfer will be started immediately.

https://www.lendingclub.com/developers/add-funds.action

**Parameters**

**amount**: `Number`, Amount of cash to transfer to the account.

**startDate**: `Date`, An optional Date representing a time in the
  future to execute this transfer.

**Returns**: `Promise.<Date>`, estimatedFundsTransferDate - A Date returned
  from the LC server representing the estimated date and time this
  transfer will execute.

### AccountsResource.addRecurringFunds(frequency, amount, startDate, endDate) 

Set up a recurring transfer of funds from the account's linked
bank account into the account. If no date is specified, the
transfers will be started immediately.

  NOTE: Currently, only one recurring transfer can be set up at
  a time. The server will reject this action if the account
  already has a recurring transfer.

https://www.lendingclub.com/developers/add-funds.action

**Parameters**

**frequency**: `Enum`, How often to transfer into the account.

  Valid Options are:

    * LC.C.WEEKLY
    * LC.C.BIWEEKLY
    * LC.C.MONTHLY

**amount**: `Number`, Amount of cash to transfer to the account.

**startDate**: `Date`, An optional Date representing a time in the
  future to begin executing this recurring transfer.

**endDate**: `Date`, An optional Date representing a time after
  (startDate || now) to terminate the recurring transfer.

**Returns**: `Promise.<Date>`, estimatedFundsTransferDate - A Date returned
  from the LC server representing the estimated date and time this
  recurring transfer will begin executing.

### AccountsResource.withdrawFunds(amount) 

Withdraw an amount of available funds from the account and into
the associated bank account.

https://www.lendingclub.com/developers/add-funds.action (See bottom)

**Parameters**

**amount**: `Number`, Amount of cash to withdraw from the account.

**Returns**: `Promise.<Date>`, estimatedFundsTransferDate - A Date returned
  from the LC server representing the estimated date and time the
  withdrawal will be executed.

### AccountsResource.createPortfolio(portfolioName, portfolioDescription) 

Add a new portfolio to the account.

https://www.lendingclub.com/developers/create-portfolio.action

**Parameters**

**portfolioName**: `String`, A name for the new portfolio.

**portfolioDescription**: `String`, An optional description for
  the new portfolio.

**Returns**: `Promise.<Number>`, portfolioId

### AccountsResource.submitOrders(orders) 

Submit a set of orders for new notes.

https://www.lendingclub.com/developers/submit-order.action

**Parameters**

**orders**: `Array.<Order>`, An array of orders to be submitted
  for purchase.

**Returns**: `Promise.<Array.<Object>>`, orderConfirmations



* * *











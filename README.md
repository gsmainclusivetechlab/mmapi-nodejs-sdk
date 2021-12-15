# mmapi-nodejs-sdk

Use the MMAPI Node.js SDK to get started quickly with the [GSMA Mobile Money API](https://developer.mobilemoneyapi.io/1.2).

## Install the SDK
Create a Node.js project in your directory, then run the following command to install the Mobile Money Api Node.js SDK.

```javascript 
npm install mmapi-nodejs-sdk
```

## Set up the environment
After you install the SDK, make it available to your app and configure your environment. 
Configuration details include either sandbox for testing or live for production, and your consumer key, consumer secret, api key, security option  and callback url for your app.

In the directory where you installed the SDK,  include this code to make the SDK available and configure your environment with your application credentials for sandbox and live environments in the Developer Dashboard.

```javascript
/**
 * MMAPI Node.js SDK dependency
*/
const mmapi = require('mmapi-nodejs-sdk');

/**
  * Set up and return MMAPI Noe.js SDK environment.
*/
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET;
const apiKey = process.env.API_KEY;
const securityOption = process.env.SECURITY_OPTION; // optional  DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
const callbackUrl = process.env.CALLBACK_URL;

let environment;

if (process.env.NODE_ENV === 'production') {
  environment = new mmapi.core.LiveEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
}

environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);

/**
  * Returns MMAPI Noe.js SDK HTTP client instance with environment.
  * Use this instance to invoke MMAPI APIs
*/
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);
```


## Use Cases

* [Merchant Payments](#merchant-payments)
* [Disbursements](#disbursements)
* [International Transfers](#international-transfers)
* [P2P Transfers](#p2p-transfers)
* [Recurring Payments](#recurring-payments)
* [Account Linking](#account-linking)
* [Bill Payments](#bill-payments)

### Merchant Payments

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Payee-Initiated Merchant Payment</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payee Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Payee-Initiated Merchant Payment using the Polling Method</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payee Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewRequestState.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewTransaction.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td>Payer-Initiated Merchant Payment</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payer Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Payee-Initiated Merchant Payment using a Pre-authorised Payment Code</td>
    <td><a href="/docs/merchantPayment/createAuthorisationCode.Readme.md">Obtain an Authorisation Code</a></td>
    <td>createAuthorisationCode</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Perform a Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewAuthorisationCode.Readme.md">View An Authorisation Code</a></td>
    <td>viewAuthorisationCode</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Merchant Payment Refund</td>
    <td><a href="/docs/merchantPayment/createRefundTransaction.Readme.md">Perform a Merchant Payment Refund</a></td>
    <td>createRefundTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td>Merchant Payment Reversal</td>
    <td><a href="/docs/merchantPayment/createReversal.Readme.md">Perform a Merchant Payment Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain a Merchant Balance</td>
    <td><a href="docs/merchantPayment/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td>Retrieve Payments for a Merchant</td>
    <td><a href="/docs/merchantPayment/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/merchantPayment/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/merchantPayment/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
    <td><a href="/docs/merchantPayment/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Disbursements

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Individual Disbursement</td>
    <td><a href="/docs/disbursement/createDisbursementTransaction.Readme.md">Create A Disbursement Transaction</a></td>
    <td>createDisbursementTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">Bulk Disbursement</td>
    <td><a href="/docs/disbursement/createBatchTransaction.Readme.md">Create A Transaction Batch</a></td>
    <td>createBatchTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchTransaction.Readme.md">View A Transaction Batch</a></td>
    <td>viewBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchCompletions.Readme.md">View Batch Completions</a></td>
    <td>viewBatchCompletions</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchRejections.Readme.md">View Batch Rejections</a></td>
    <td>viewBatchRejections</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td rowspan="5">Bulk Disbursement with Maker / Checker</td>
    <td><a href="/docs/disbursement/createBatchTransaction.Readme.md">Create A Transaction Batch</a></td>
    <td>createBatchTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/updateBatchTransaction.Readme.md">Update A Transaction Batch</a></td>
    <td>updateBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchTransaction.Readme.md">View A Transaction Batch</a></td>
    <td>viewBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchCompletions.Readme.md">View Batch Completions</a></td>
    <td>viewBatchCompletions</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchRejections.Readme.md">View Batch Rejections</a></td>
    <td>viewBatchRejections</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td rowspan="3">Individual Disbursement Using the Polling Method</td>
    <td><a href="/docs/disbursement/createDisbursementTransaction.Readme.md">Create a Individual Disbursement request </a></td>
    <td>createDisbursementTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewRequestState.Readme.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewTransaction.Readme.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td>Disbursement Reversal</td>
    <td><a href="/docs/disbursement/createReversal.Readme.Readme.md">Perform a Disbursement Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain a Disbursement Organisation Balance</td>
    <td><a href="/docs/disbursement/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td>Retrieve Transactions for a Disbursement Organisation</td>
    <td><a href="/docs/disbursement/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/disbursement/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/disbursement/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### International Transfers

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3">International Transfer via Hub</td>
    <td><a href="/docs/internationalTransfer/createQuotation.Readme.md">Request a International Transfer Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/createInternationalTransaction.Readme.md">Perform an International Transfer</a></td>
    <td>createInternationalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td>Optional <a href="/docs/internationalTransfer/viewQuotation.Readme.md">View A Quotation</a></td>
    <td>viewQuotation</td>
    <td>quotationReference</td>
  </tr>
  <tr>
    <td rowspan="3">Bilateral International Transfer</td>
    <td><a href="/docs/internationalTransfer/createQuotation.Readme.md">Request a International Transfer Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/createInternationalTransaction.Readme.md">Perform an International Transfer</a></td>
    <td>createInternationalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td>Optional <a href="/docs/internationalTransfer/viewQuotation.Readme.md">View A Quotation</a></td>
    <td>viewQuotation</td>
    <td>quotationReference</td>
  </tr>
  <tr>
  <tr>
    <td>International Transfer Reversal</td>
    <td><a href="/docs/internationalTransfer/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain an FSP Balance</td>
    <td><a href="/docs/internationalTransfer/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td>Retrieve Transactions for an FSP</td>
    <td><a href="/docs/internationalTransfer/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/internationalTransfer/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/internationalTransfer/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### P2P Transfers

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3">P2P Transfer via Switch</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createQuotation.Readme.md">Request a P2P Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td>Optional <a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>

  <tr>
    <td rowspan="2">Bilateral P2P Transfer</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>

  <tr>
    <td>‘On-us’ P2P Transfer Initiated by a Third Party Provider</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createQuotation.Readme.md">Request a P2P Quotation</a></td>
    <td>createQuotation</td>
    <td>{ identifierType: identifier }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>

  <tr>
    <td>P2P Transfer Reversal</td>
    <td><a href="/docs/p2pTransfer/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td></td>
  </tr>

  <tr>
    <td>Obtain an FSP Balance</td>
    <td><a href="/docs/p2pTransfer/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td></td>
  </tr>

   <tr>
    <td>Retrieve Transactions for an FSP</td>
    <td><a href="/docs/p2pTransfer/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountBalance</td>
    <td></td>
  </tr>

  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/p2pTransfer/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/p2pTransfer/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>

</tbody>
</table>

* P2P Transfer via Switch
    * [GET Retrieve the Name of the Recipient](/docs/accounts/viewAccountName.Readme.md)
    * [POST Request a P2P Quotation](/docs/quotations/createQuotation.Readme.md)
    * [POST Perform a P2P Transfer](/docs/transactions/createTransferTransaction.Readme.md)
* Bilateral P2P Transfer
    * [GET Retrieve the Name of the Recipient](/docs/accounts/viewAccountName.Readme.md)
    * [POST Perform a P2P Transfer](/docs/transactions/createTransferTransaction.Readme.md)
* ‘On-us’ P2P Transfer Initiated by a Third Party Provider
    * [GET Retrieve the Name of the Recipient](/docs/accounts/viewAccountName.Readme.md)
    * [POST Request a P2P Quotation](/docs/quotations/createQuotation.Readme.md)
    * [POST Perform a P2P Transfer](/docs/transactions/createTransferTransaction.Readme.md)
* P2P Transfer Failure
* P2P Transfer Reversal
    * [POST Perform a Transaction Reversal](/docs/transactions/createReversal.Readme.md)
* Obtain an FSP Balance
    * [GET Get an Account Balance](/docs/accounts/viewAccountBalance.Readme.md)
* Retrieve Transactions for an FSP
    * [GET Retrieve a Set of Transactions for an Account](/docs/accounts/viewAccountTransactions.Readme.md)
* Check for Service Availability
    * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)
* Retrieve a Missing API Response
    * [GET Retrieve a Missing Response](/docs/supporting/viewResponse.Readme.md)
    * [GET Retrieve a Missing Resource](/docs/supporting/viewResource.Readme.md)

### Recurring Payments

* Setup a Recurring Payment
   * [POST Setup a Recurring Payment](/docs/debitMandates/createAccountDebitMandate.Readme.md)
* Setup a Recurring Payment Failure
* Take a Recurring Payment
    * [POST Take a Recurring Payment](/docs/transactions/createMerchantTransaction.Readme.md)
* Take a Recurring Payment Failure
* Take a Recurring Payment using the Polling Method
    * [POST Take a Recurring Payment](/docs/transactions/createMerchantTransaction.Readme.md)
    * loop [GET Poll to Determine the Request State](/docs/supporting/viewRequestState.Readme.md)
    * optional [GET Retrieve a Transaction](/docs/transactions/viewTransaction.Readme.md)
* Recurring Payment Refund
    * [POST Perform a Recurring Payment Refund](/docs/transactions/createRefundTransaction.Readme.md)
* Recurring Payment Reversal
    * [POST Perform a Merchant Payment Reversal](/docs/transactions/createReversal.Readme.md)
* Payer sets up a Recurring Payment using MMP Channel
    * [POST Setup a Recurring Payment](/docs/debitMandates/createAccountDebitMandate.Readme.md)
    * optional [GET View A Debit Mandate](/docs/debitMandates/viewAccountDebitMandate.Readme.md)
* Obtain a Service Provider Balance
    * [GET Get an Account Balance](/docs/accounts/viewAccountBalance.Readme.md)
* Retrieve Payments for a Service Provider
    * [GET Retrieve a Set of Transactions for an Account](/docs/accounts/viewAccountTransactions.Readme.md)
* Check for Service Availability
    * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)
* Retrieve a Missing API Response
    * [GET Retrieve a Missing Response](/docs/supporting/viewResponse.Readme.md)
    * [GET Retrieve a Missing Resource](/docs/supporting/viewResource.Readme.md)

### Account Linking

* Setup an Account Link
   * [POST Establish an Account to Account Link](/docs/links/createAccountLink.Readme.md)
   * optional [GET View A Link](/docs/links/viewAccountLink.Readme.md)
* Setup an Account Link Failure
* Perform a Transfer for a Linked Account
   * [POST Use a Link to make a Transfer](/docs/transactions/createTransferTransaction.Readme.md)
* Perform a Transfer for a Linked Account - Failure
* Perform a Transfer using an Account Link via the Polling Method
    * [POST Use a Link to make a Transfer](/docs/transactions/createTransferTransaction.Readme.md)
    * loop [GET Poll to Determine the Request State](/docs/supporting/viewRequestState.Readme.md)
    * optional [GET Retrieve a Transaction](/docs/transactions/viewTransaction.Readme.md)
* Perform a Transfer Reversal
    * [POST Perform a Transaction Reversal](/docs/transactions/createReversal.Readme.md)
* Obtain a Financial Service Provider Balance
    * [GET Get an Account Balance](/docs/accounts/viewAccountBalance.Readme.md)
* Retrieve Transfers for a Financial Service Provider
    * [GET Retrieve a Set of Transactions for an Account](/docs/accounts/viewAccountTransactions.Readme.md)
* Check for Service Availability
    * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)
* Retrieve a Missing API Response
    * [GET Retrieve a Missing Response](/docs/supporting/viewResponse.Readme.md)
    * [GET Retrieve a Missing Resource](/docs/supporting/viewResource.Readme.md)

### Bill Payments

* Successful Retrieval of Bills
    * [GET Retrieve a Set of Bills]()
* Unsuccessful Retrieval of Bills
* Make a Successful Bill Payment with Callback
    * [POST Make a Bill Payment]()
* Make an Unsuccessful Bill Payment with Callback
* Make a Bill Payment with Polling
    * [POST Make a Bill Payment Via the Polling Method]()
    * loop [GET Poll to Determine the Request State](/docs/supporting/viewRequestState.Readme.md)
    * optional [GET Retrieve Bill Payments for a Given Bill]()
* Retrieval of Bill Payments
    * [GET Retrieve a Set of Bill Payments]()
* Check for Service Availability
    * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)

## Test
```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test

```
## Samples
Note: Update the samples/test_harness.js with your sandbox client credentials or pass your client credentials as environment variable while executing the samples.

**To run all usecase scenarios for a usecase (merchantpay, disbursements, etc)**

```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL node test/merchantPayment.js
```

```
$ npm install
$ node test/merchantPayment.js
```

*By default merchantPayment.js will execute all usecase scenarios for the usecase*

> To select a specific use case scenario, edit the test/merchantPayment.js by passing the usecase number as shown below

```javascript
// merchantPayment.js
(async () => {
 
})(5);
```

**To run a usecase scenario by passing parameters to the function manually**

*Replace the parameter with a value*

```javascript
// samples/transactions/createMerchantTransaction.js

if (require.main === module) {
  (async () => {
    try {
      await createMerchantTransaction('<<REPLACE-WITH-BODY>>', '<<REPLACE-WITH-USE-CASE>>', '<<REPLACE-WITH-POLLING-TRUE-OR-FALSE>>', true);
    } catch (err) {
    }
  })();
}
```

```
$ npm install
$ node samples/transactions/createMerchantTransaction.js
```

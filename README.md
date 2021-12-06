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
* Payee-Initiated Merchant Payment
   * [POST Payee Initiated Merchant Payment](/docs/transactions/createMerchantTransaction.Readme.md)
* Payee-Initiated Merchant Payment Failure
* Payee-Initiated Merchant Payment using the Polling Method
   * [POST Payee Initiated Merchant Payment](/docs/transactions/createMerchantTransaction.Readme.md)
   * loop [GET Poll to Determine the Request State](/docs/supporting/viewRequestState.Readme.md)
   * optional [GET Retrieve a Transaction](/docs/transactions/viewTransaction.Readme.md)
* Payer-Initiated Merchant Payment
   * [POST Payer Initiated Merchant Payment](/docs/transactions/createMerchantTransaction.Readme.md)
* Payer-Initiated Merchant Payment Failure
* Payee-Initiated Merchant Payment using a Pre-authorised Payment Code
   * [POST Obtain an Authorisation Code](/docs/authorisationCodes/createAuthorisationCode.Readme.md)
   * [POST Perform a Merchant Payment](/docs/transactions/createMerchantTransaction.Readme.md)
   * optional [GET View An Authorisation Code](/docs/authorisationCodes/viewAuthorisationCode.Readme.md)
* Merchant Payment Refund
   * [POST Perform a Merchant Payment Refund](/docs/transactions/createRefundTransaction.Readme.md)
* Merchant Payment Reversal
   * [POST Perform a Merchant Payment Reversal](/docs/transactions/createReversal.Readme.md)
* Obtain a Merchant Balance
   * [GET Get an Account Balance](/docs/accounts/viewAccountBalance.Readme.md)
* Retrieve Payments for a Merchant
   * [GET Retrieve a Set of Transactions for an Account](/docs/accounts/viewAccountTransactions.Readme.md)
* Check for Service Availability
   * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)
* Retrieve a Missing API Response
   * [GET Retrieve a Missing Response](/docs/supporting/viewResponse.Readme.md)
   * [GET Retrieve a Missing Resource](/docs/supporting/viewResource.Readme.md)

### Disbursements

* Individual Disbursement
    * [POST Perform an Individual Disbursement](/docs/transactions/createDisbursementTransaction.Readme.md)
* Individual Disbursement Failure
* Bulk Disbursement
    * [POST Perform a Bulk Disbursement](/docs/transactions/createBatchTransaction.Readme.md)
    * optional [GET Retrieve Batch Transactions that have Completed](/docs/transactions/viewBatchCompletions.Readme.md)
    * optional [GET Retrieve Batch Transactions that have been Rejected](/docs/transactions/viewBatchRejections.Readme.md)
    * optional [GET View A Transaction Batch](/docs/transactions/viewBatchTransaction.Readme.md)
* Bulk Disbursement Failure
* Bulk Disbursement with Maker / Checker
    * [POST Perform a Bulk Disbursement](/docs/transactions/createBatchTransaction.Readme.md)
    * [PATCH Update A Transaction Batch](/docs/transactions/updateBatchTransaction.Readme.md)
    * optional [GET Retrieve Batch Transactions that have Completed](/docs/transactions/viewBatchCompletions.Readme.md)
    * optional [GET Retrieve Batch Transactions that have been Rejected](/docs/transactions/viewBatchRejections.Readme.md)
    * optional [GET View A Transaction Batch](/docs/transactions/viewBatchTransaction.Readme.md)
* Individual Disbursement Using the Polling Method
    * [POST Perform an Individual Disbursement](/docs/transactions/createDisbursementTransaction.Readme.md)
    * loop [GET Poll to Determine the Request State](/docs/supporting/viewRequestState.Readme.md)
    * optional [GET Retrieve a Transaction](/docs/transactions/viewTransaction.Readme.md)
* Disbursement Reversal
    * [POST Perform a Transaction Reversal](/docs/transactions/createReversal.Readme.md)
* Obtain a Disbursement Organisation Balance
    * [GET Get an Account Balance](/docs/accounts/viewAccountBalance.Readme.md)
* Retrieve Transactions for a Disbursement Organisation
    * [GET Retrieve a Set of Transactions for an Account](/docs/accounts/viewAccountTransactions.Readme.md)
* Check for Service Availability
    * [GET Check for Service Availability](/docs/supporting/viewServiceAvailability.Readme.md)
* Retrieve a Missing API Response
    * [GET Retrieve a Missing Response](/docs/supporting/viewResponse.Readme.md)
    * [GET Retrieve a Missing Resource](/docs/supporting/viewResource.Readme.md)

### International Transfers

* International Transfer via Hub
    * [POST Request a International Transfer Quotation](/docs/quotations/createQuotation.Readme.md)
    * [POST Perform an International Transfer](/docs/transactions/createInternationalTransaction.Readme.md)
    * optional [GET View A Quotation](/docs/quotations/viewQuotation.Readme.md)
* Bilateral International Transfer
    * [POST Request a International Transfer Quotation](/docs/quotations/createQuotation.Readme.md)
    * [POST Perform an International Transfer](/docs/transactions/createInternationalTransaction.Readme.md)
    * optional [GET View A Quotation](/docs/quotations/viewQuotation.Readme.md)
* International Transfer Failure
* International Transfer Reversal
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

### P2P Transfers

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

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

## How to make API calls

| Usecase     | Method     | API           | End Point
| ------------- | ------------- | ------------- | ------------- |
| Common | GET |[Check for Service Availability](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/checkForServiceAvailability.Readme.md)| /heartbeat |
| Common | GET |[Get an Account Balance](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/getAnAccountBalance.Readme.md)| /accounts/{identifierType}/{identifier}/balance |
| Common | GET |[Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/retrieveASetOfTransactionsForAnAccount.Readme.md)| /accounts/{identifierType}/{identifier}/transactions |
| Common | GET |[Link](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/link.Readme.md)| /{link} |
| Common | GET |[Retrieve a Missing Response](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/retrieveAMissingResponse.Readme.md)| /responses/{clientCorrelationId} |
| Common | GET |[Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/pollToDetermineTheRequestState.Readme.md)| /requeststates/{serverCorrelationId} |
| Common | GET |[Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/retrieveATransaction.Readme.md)| /transactions/{transactionReference} |
| Common | POST |[Perform a Transaction Reversal](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/performATransactionReversal.Readme.md)| /transactions/{originalTransactionReference}/reversals |
| Merchant Payment | POST |[Perform a Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/merchantPayment/performAMerchantPayment.Readme.md)| /transactions/type/merchantpay |
| Merchant Payment | POST |[Perform A Merchant Payment Via Polling](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/merchantPayment/performAMerchantPaymentViaPolling.Readme.md)| /transactions/type/merchantpay |
| Merchant Payment | POST |[Obtain an Authorisation Code](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/merchantPayment/obtainAnAuthorisationCode.Readme.md)| /accounts/{identifierType}/{identifier}/authorisationcodes |
| Merchant Payment | POST |[Perform a Merchant Payment Refund](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/merchantPayment/performAMerchantPaymentRefund.Readme.md)| /transactions/type/adjustment |
| Disbursement | POST |[Perform an Individual Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/performAnIndividualDisbursement.Readme.md)| /transactions/type/disbursement |
| Disbursement | POST |[Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/performABulkDisbursement.Readme.md)| /batchtransactions |
| Disbursement | POST |[Perform an Individual Disbursement Via Polling](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/performAnIndividualDisbursementViaPolling.Readme.md)| /transactions/type/disbursement |
| Disbursement | GET |[View A Transaction Batch](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/viewATransactionBatch.Readme.md)| /batchtransactions/{batchId} |
| Disbursement | GET |[Retrieve Batch Transactions that have Completed](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/retrieveBatchTransactionsThatHaveCompleted.Readme.md)| /batchtransactions/{batchId}/completions |
| Disbursement | GET |[Retrieve Batch Transactions that have been Rejected](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/retrieveBatchTransactionsThatHaveBeenRejected.Readme.md)| /batchtransactions/{batchId}/rejections |

## Test
```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test
```
## Samples

#### Way 1

```
$ npm install
$ cd samples/common
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL node checkForServiceAvailability.js 
```
#### Way 2
```
$ npm install
$ cd samples
$ Update the sample_harness.js with your sandbox client credentials
$ cd common
$ node checkForServiceAvailability.js 
```

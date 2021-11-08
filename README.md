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

### Merchant Payments
* Payee-Initiated Merchant Payment
    * [POST Payee Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createAMerchantPayTransaction.Readme.md)
* Payee-Initiated Merchant Payment Failure
* Payee-Initiated Merchant Payment using the Polling Method
   * [POST Payee Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createAMerchantPayTransaction.Readme.md)
   * loop [GET Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewARequestState.Readme.md)
   * optional [GET Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewATransaction.Readme.md)
* Payer-Initiated Merchant Payment
   * [POST Payer Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createAMerchantPayTransaction.Readme.md)
* Payer-Initiated Merchant Payment Failure
* Payee-Initiated Merchant Payment using a Pre-authorised Payment Code
   * [POST Obtain an Authorisation Code](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createAnAuthorisationCode.Readme.md)
   * [POST Perform a Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createAMerchantPayTransaction.Readme.md)
* Merchant Payment Refund
   * [POST Perform a Merchant Payment Refund](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/merchantPayment/createARefundTransaction.Readme.md)
* Merchant Payment Reversal
   * [POST Perform a Merchant Payment Reversal](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/createAReversal.Readme.md)
* Obtain a Merchant Balance
   * [GET Get an Account Balance](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAccountBalance.Readme.md)
* Retrieve Payments for a Merchant
   * [GET Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAccountSpecificTransaction.Readme.md)
* Check for Service Availability
   * [GET Check for Service Availability](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/checkApiAvailability.Readme.md)
* Retrieve a Missing API Response
   * [GET Retrieve a Missing Response](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAResponse.Readme.md)
   * [GET Retrieve a Missing Resource](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAResource.Readme.md)
 
### Disbursements

* Individual Disbursement
    * [POST Perform an Individual Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/createADisbursementTransaction.Readme.md)
* Individual Disbursement Failure
* Bulk Disbursement
    * [POST Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/createATransactionBatch.Readme.md)
    * optional [GET Retrieve Batch Transactions that have Completed](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewBatchCompletions.Readme.md)
    * optional [GET Retrieve Batch Transactions that have been Rejected](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewBatchRejections.Readme.md)
    * optional [GET View A Transaction Batch](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewATransactionBatch.Readme.md)
* Bulk Disbursement Failure
* Bulk Disbursement with Maker / Checker
    * [POST Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/createATransactionBatch.Readme.md)
    * [PATCH Update A Transaction Batch](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/updateATransactionBatch.Readme.md)
    * optional [GET Retrieve Batch Transactions that have Completed](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewBatchCompletions.Readme.md)
    * optional [GET Retrieve Batch Transactions that have been Rejected](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewBatchRejections.Readme.md)
    * optional [GET View A Transaction Batch](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/viewATransactionBatch.Readme.md)
* Individual Disbursement Using the Polling Method
    * [POST Perform an Individual Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/disbursement/createADisbursementTransaction.Readme.md)
    * loop [GET Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewARequestState.Readme.md)
    * optional [GET Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewATransaction.Readme.md)
* Disbursement Reversal
    * [POST Perform a Transaction Reversal](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/createAReversal.Readme.md)
* Obtain a Disbursement Organisation Balance
    * [GET Get an Account Balance](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAccountBalance.Readme.md)
* Retrieve Transactions for a Disbursement Organisation
    * [GET Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAccountSpecificTransaction.Readme.md)
* Check for Service Availability
   * [GET Check for Service Availability](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/checkApiAvailability.Readme.md)
* Retrieve a Missing API Response
   * [GET Retrieve a Missing Response](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAResponse.Readme.md)
   * [GET Retrieve a Missing Resource](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewAResource.Readme.md)


## Test
```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test

```
## Samples
Note: Update the samples/sample_harness.js with your sandbox client credentials or pass your client credentials as environment variable while executing the samples. 

**To run all usecase scenarios for a usecase (merchantpay, disbursements, etc)**

 ```
$ npm install
$ cd samples/merchantPayment
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL node runAll.js
```
```
$ npm install
$ cd samples/merchantPayment
$ node runAll.js
```
*By default runAll.js will execute all usecase scenarios for the usecase*

> To select a specific use case scenario, edit the runAll.js by passing the usecase number as shown below

```javascript
// runAll.js
(async () => {
 
})(5);
```

**To run a usecase scenario by passing parameters to the function manually**

*Replace the parameter with a value*

```javascript
// createAMerchantPayTransaction.js

if (require.main === module) {
  (async () => {
    try {
      await createAMerchantPayTransaction('REPLACE-WITH-POLLING-TRUE-OR-FALSE', true);
    } catch (err) {
    }
  })();
}
```

```
$ npm install
$ cd samples/merchantPayment
$ node createAMerchantPayTransaction.js
```
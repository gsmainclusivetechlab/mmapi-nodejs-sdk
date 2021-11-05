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
   * [GET Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewARequestState.Readme.md)
   * [GET Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-disbursements/docs/common/viewATransaction.Readme.md)
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

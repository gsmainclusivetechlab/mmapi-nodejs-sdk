# mmapi-nodejs-sdk

## Initialize Client

```javascript
const mmapi = require('mmapi-nodejs-sdk');

// Creating an environment
let consumerKey = "<<MOBILE_MONEY_API_CONSUMER_KEY>>";
let consumerSecret = "<<MOBILE_MONEY_API_API_CONSUMER_SERCRET>>";
let apiKey = "<<MOBILE_MONEY_API_API_KEY>>"
let securityOption = "<<DEVELOPMENT_LEVEL || STANDARD_LEVEL || ENHANCED_LEVEL>>" // optional
let callbackUrl = "<<CALLBACK_URL>>"

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);
```

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
| Disbursement | GET |[Retrieve Batch Transactions that have Completed](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/retrieveBatchTransactionsThatHaveCompleted.Readme.md)| /batchtransactions/{batchId}/completions |
| Disbursement | GET |[Retrieve Batch Transactions that have been Rejected](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/disbursement/retrieveBatchTransactionsThatHaveBeenRejected.Readme.md)| /batchtransactions/{batchId}/rejections |

## How to Run

```
1. npm install
2. cd samples/common
3. node checkForServiceAvailability.js
```

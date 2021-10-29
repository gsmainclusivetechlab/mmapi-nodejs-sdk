# mmapi-nodejs-sdk

## Initialize Client

```javascript
const mmapi = require('mmapi-nodejs-sdk');

// Creating an environment
let consumerKey = "<<MOBILE_MONEY_API_CONSUMER_KEY>>";
let consumerSecret = "<<MOBILE_MONEY_API_API_CONSUMER_SERCRET>>";
let apiKey = "<<MOBILE_MONEY_API_API_KEY>>"
let securityOption = "<<DEVELOPMENT_LEVEL || STANDARD_LEVEL || ENHANCED_LEVEL>>" // optional

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey);
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);
```

| Usecase     | Method     | API           | End Point
| ------------- | ------------- | ------------- | ------------- |
| Common | GET |[Check for Service Availability](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/checkForServiceAvailability.Readme.md)| /heartbeat |
| Common | GET |[Get an Account Balance](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/getAnAccountBalance.Readme.md)| /accounts/{identifierType}/{identifier}/balance |
| Common | GET |[Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/retrieveASetOfTransactionsForAnAccount.Readme.md)| /accounts/{identifierType}/{identifier}/transactions |
| Common | GET |[Retrieve a Missing Response](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/retrieveAMissingResponse.Readme.md)| /responses/{clientCorrelationId} |
| Common | GET |[Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/pollToDetermineTheRequestState.Readme.md)| /requeststates/{serverCorrelationId} |
| Common | POST |[Perform a Transaction Reversal](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/docs/common/performATransactionReversal.Readme.md)| /transactions/{originalTransactionReference}/reversals |
| Merchant Payments | POST |[Payee Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/performAMerchantPayment.Readme.md)|
| Merchant Payments | POST |[Payer Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/performAMerchantPayment.Readme.md)|
| Merchant Payments | POST |[Perform a Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/performAMerchantPayment.Readme.md)|
| Merchant Payments | GET |[Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/pollToDetermineTheRequestStateRequest.Readme.md)|
| Merchant Payments | GET |[Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/retrieveATransactionRequest.Readme.md)|
| Merchant Payments | POST |[Payer Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/performAMerchantPaymentRequest.Readme.md)|
| Merchant Payments | POST |[Obtain an Authorisation Code](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/obtainAnAuthorisationCodeRequest.Readme.md)|
| Merchant Payments | POST |[Perform a Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/performAMerchantPaymentRequest.Readme.md)|
| Merchant Payments | POST |[Perform a Merchant Payment Refund](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/performAMerchantPaymentRefundRequest.Readme.md)|
| Merchant Payments | POST |[Perform a Merchant Payment Refund](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/performAMerchantPaymentRefundRequest.Readme.md)|
| Merchant Payments | POST |[Perform a Merchant Payment Reversal](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/performAMerchantPaymentReversalRequest.Readme.md)|
| Merchant Payments | GET |[Get an Account Balance](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/getAnAccountBalanceRequest.Readme.md)|
| Merchant Payments | GET |[Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/retrieveASetOfTransactionsForAnAccountRequest.Readme.md)|
| Merchant Payments | GET |[Retrieve a Set of Transactions for an Account](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/merchantPayment/retrieveASetOfTransactionsForAnAccountRequest.Readme.md)|
| Disbursements | POST |[Perform an Individual Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/disbursement/performAnIndividualDisbursement.Readme.md)|
| Disbursements | POST |[Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/disbursement/performABulkDisbursement.Readme.md)|

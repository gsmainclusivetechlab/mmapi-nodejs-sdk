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

| API       | Method           |
| ------------- | ------------- |
|[POST Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/readme/disbursement/performABulkDisbursement.Readme.md)|

# Perform An Individual Disbursement

### Usage/Examples

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

const buildRequestBody = () => ({
  amount: '200.00',
  creditParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
  currency: 'RWF',
  debitParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
});

buildXCallbackURL = () => 'https://www.example.com';

// Call API with your client and get a response for your call
const performAnIndividualDisbursement  = async function() {
    // Construct a request object and set desired parameters
    // Here, PerformAnIndividualDisbursement() creates a POST request to /transactions/type/disbursement
    const request = new mmapi.disbursement.PerformAnIndividualDisbursement();
    request.data = buildRequestBody();
    request.headers['X-Callback-URL'] = buildXCallbackURL();

    const response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the data attribute of the response.
    console.log(`Response Data: ${JSON.stringify(response.data)}`);
    return response;
}
performAnIndividualDisbursement()
```

  
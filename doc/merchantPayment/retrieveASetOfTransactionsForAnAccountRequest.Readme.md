# Retrieve A Set Of Transactions For An Account

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

// Call API with your client and get a response for your call
let retrieveASetofTransactionsForAnAccountRequest  = async function() {
    // Construct a request object and set desired parameters
    // Here, RetrieveASetOfTransactionsForAnAccountRequest() creates a GET request to /accounts/{identifierType}/{identifier}/transactions?offset=0&limit=20
    const request = new mmapi.merchantPayment.RetrieveASetOfTransactionsForAnAccountRequest();
    request.identifierType('accountid');
    request.identifier(2000);
    request.offset(0);
    request.limit(20);

    const response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the data attribute of the response.
    console.log(`Response Data: ${JSON.stringify(response.data)}`);
    return response;
}
retrieveASetofTransactionsForAnAccountRequest()
```
# Retrive Missing Resource Representation

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

let clientCorrelationId;

// Call API with your client and get a response for your call
const performAMerchantPaymentRequest = async () => {
  // Construct a request object and set desired parameters
  // Here, PerformAMerchantPaymentRequest() creates a POST request to /transactions/type/merchantpay
  const request = new mmapi.merchantPayment.PerformAMerchantPaymentRequest();
  clientCorrelationId = request.headers['X-CorrelationID'];
  request.xCallbackURL(buildXCallbackURL());
  request.requestBody(buildRequestBody());

  const response = await client.execute(request);
  return response;
}

// Call API with your client and get a response for your call
const retrieveAMissingApiResponseRequest = async () => {
    // Construct a request object and set desired parameters
    // Here, RetrieveAMissingApiResponseRequest() creates a GET request to /responses/{clientCorrelationId}
    const request = new mmapi.merchantPayment.RetrieveAMissingApiResponseRequest();
    await performAMerchantPaymentRequest();
    request.clientCorrelationId(clientCorrelationId);

    const response = await client.execute(request);
    return response;
}

// Call API with your client and get a response for your call
let retriveMissingResourceRepresentationRequest  = async function() {
    // Construct a request object and set desired parameters
    // Here, RetriveMissingResourceRepresentationRequest() creates a GET request to /{link}
    const request = new mmapi.merchantPayment.RetriveMissingResourceRepresentationRequest();
    const { data: { link } } = await retrieveAMissingApiResponseRequest();
    request.link(link);

    const response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the data attribute of the response.
    console.log(`Response Data: ${JSON.stringify(response.data)}`);
    return response;
}
retriveMissingResourceRepresentationRequest()
```
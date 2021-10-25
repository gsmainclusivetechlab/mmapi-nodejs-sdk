# Obtain An Authorisation Code

### Usage/Examples

```javascript
const mmapi = require('mmapi-nodejs-sdk');

// Creating an environment
let consumerKey = "<<MOBILE_MONEY_API_CONSUMER_KEY>>";
let consumerSecret = "<<MOBILE_MONEY_API_API_CONSUMER_SERCRET>>";
let apiKey = "<<MOBILE_MONEY_API_API_KEY>>"
let securityOption = "<<DEVELOPMENT_LEVEL || STANDARD_LEVEL || ENHANCED_LEVEL>>" // optional

const buildRequestBody = () => ({
  requestDate: '2018-07-03T10:43:27.405Z',
  currency: 'GBP',
  amount: '1000.00',
});

buildXCallbackURL = () => 'https://www.example.com';

// Call API with your client and get a response for your call
let obtainAnAuthorisationCodeRequest  = async function() {
    // Construct a request object and set desired parameters
    // Here, ObtainAnAuthorisationCodeRequest() creates a POST request to /accounts/{{identifierType}}/{{identifier}}/authorisationcodes
    const request = new ObtainAnAuthorisationCodeRequest();
    request.xCallbackURL(buildXCallbackURL());
    request.identifierType('accountid');
    request.identifier(2000);
    request.requestBody(buildRequestBody());

    const response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the data attribute of the response.
    console.log(`Response Data: ${JSON.stringify(response.data)}`);
    return response;
}
obtainAnAuthorisationCodeRequest()
```

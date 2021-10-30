
# Obtain An Authorisation Code

### Usage/Examples

```javascript
const buildRequestBody = () => ({"requestDate":"2018-07-03T10:43:27.405Z","currency":"GBP","amount":"1000.00"});

const obtainAnAuthorisationCode  = async (identifierType, identifier) => {
  try {
    // Construct a request object and set desired parameters
    // Here, ObtainAnAuthorisationCodeRequest(identifierType, identifier) creates a POST request to /accounts/{identifierType}/{identifier}/authorisationcodes
    const request = new mmapi.merchantPayment.ObtainAnAuthorisationCodeRequest(identifierType, identifier);
    // Set request body
    request.data = buildRequestBody();

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
obtainAnAuthorisationCode('REPLACE-WITH-IDENTIFIER-TYPE', 'REPLACE-WITH-IDENTIFIER')
```

### Example Output
```javascript
  202

  {
    "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "1056",
    "pollLimit": 100
  }
```


# Create An Authorisation Code Via An Account Identifier.

`Here, createAuthorisationCode() creates a POST request to /accounts/{identifierType}/{identifier}/authorisationcodes`

> `This endpoint allows allows a mobile money payer or payee to generate a code which when presented to the other party, can be redeemed for an amount set by the payer or payee, depending upon the use case.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  requestDate: '2018-07-03T10:43:27.405Z',
  currency: 'GBP',
  amount: '1000.00',
});

/**
 * Set up your function to be invoked
 */
const createAuthorisationCode = async (identifierType, identifier) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.merchantPayment.createAuthorisationCode(identifierType, identifier);

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

    /**
     * Chose the polling method.
     */
    request.polling();

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    console.log("Response Headers: ", response.headers);

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    console.log(err);

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
createAuthorisationCode('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>');
```

### Example Output - Callback
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

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "679b684e-9b2f-4140-b0b8-dc53d183ffaf",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "1707",
  "pollLimit": 100
}
```
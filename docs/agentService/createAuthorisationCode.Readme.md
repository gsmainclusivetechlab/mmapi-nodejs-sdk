
# Create An Authorisation Code Via An Account Identifier

`Here, createAuthorisationCode({ identifierType1: identifier1 }) creates a POST request to /accounts/{identifierType}/{identifier}/authorisationcodes`

> `This endpoint allows a mobile money payer or payee to generate a code which when presented to the other party, can be redeemed for an amount set by the payer or payee, depending upon the use case where one identifier suffices to uniquely identify an account.`

`Here, createAuthorisationCode({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a POST request to /accounts/{AccountIdentifiers}/authorisationcodes`

> `This endpoint allows a mobile money payer or payee to generate a code which when presented to the other party, can be redeemed for an amount set by the payer or payee, depending upon the use case where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createAuthorisationCode = async (body, accountIdentifiers, callback = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.createAuthorisationCode(accountIdentifiers);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.requestDate(body.requestDate);
    request.currency(body.currency);
    request.amount(body.amount);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(process.env.CALLBACK_URL);
    }

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));

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
createAuthorisationCode('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>');
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

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAuthorisationCode()](viewAuthorisationCode.Readme.md) function to acquire the final representation of the Authorisation Code object.

---
# Create An Account

`Here, createAccount() creates a POST request to /accounts/{identityType}`

> `Provided with a valid object representation, this endpoint allows for a new account to be created, supplying ‘individual’ as the identityType.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createAccount = async (body, callback = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.createAccount();
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.accountIdentifiers(body.accountIdentifiers);
    request.identity(body.identity);
    request.accountType(body.accountType);
    request.customData(body.customData);
    request.fees(body.fees);
    request.registeringEntity(body.registeringEntity);
    request.requestDate(body.requestDate);

    /**
     * Chose the callback method. Default is the polling method.
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
createAccount('<<REPLACE-WITH-REQUEST-BODY>>');
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "1789adf1-ffe4-434d-bb6e-121a325621ba",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "277",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "1789adf1-ffe4-434d-bb6e-121a325621ba",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "277",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAccount()](viewAccount.Readme.md) function to acquire the final representation of the Account object.

---
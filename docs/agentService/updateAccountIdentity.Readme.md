# Update an Account Identity.

`Here, updateAccountIdentity({ identifierType1: identifier1 }, identityId) creates a PATCH request to /accounts/{identifierType}/{identifier}/identities/{identityId}`

> `This endpoint updates an account identity. identityStatus, kycVerificationStatus, kycVerificationEntity and kycLevel field updates are permitted where one identifier suffices to uniquely identify an account.`

`Here, updateAccountIdentity({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }, identityId) creates a PATCH request to /accounts/{AccountIdentifiers}/identities/{identityId}`

> `This endpoint updates an account identity. identityStatus, kycVerificationStatus, kycVerificationEntity and kycLevel field updates are permitted where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const updateAccountIdentity = async (body, accountIdentifiers, identityId, callback = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.updateAccountIdentity(accountIdentifiers, identityId);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.op(body.op);
    request.path(body.path);
    request.value(body.value);

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
updateAccountIdentity('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>', '<<REPLACE-WITH-IDENTITY-ID>>');
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "a266c43c-368e-47a5-8874-b6a0665bf87a",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "105",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "a266c43c-368e-47a5-8874-b6a0665bf87a",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "105",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAccount()](viewAccount.Readme.md) function to acquire the final representation of the Account object.

---
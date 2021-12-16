
# Create A Link

`Here, createAccountLink({ identifierType1: identifier1 }) creates a POST request to /accounts/{identifierType}/{identifier}/links`

> `Provided with a valid object representation, this endpoint allows a new link to be created for a specific account where one identifier suffices to uniquely identify an account. Note that to identify the accounts that are to be linked, the target account is specified in the path whereas the source account is specified in the link object.`

`Here, createAccountLink({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a POST request to /accounts/{AccountIdentifiers}/links`

> `Provided with a valid object representation, this endpoint allows a new link to be created for a specific account where a single identifier is not sufficient to identify an account. Note that to identify the accounts that are to be linked, the target account is specified in the path whereas the source account is specified in the link object.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createAccountLink = async (body, accountIdentifiers, polling = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.accountLinking.createAccountLink(accountIdentifiers);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameter
     */
    request.sourceAccountIdentifiers(body.sourceAccountIdentifiers);
    request.status(body.status);
    request.mode(body.mode);
    request.customData(body.customData);
    request.requestingOrganisation(body.requestingOrganisation);
    request.requestDate(body.requestDate);

    /**
     * Chose the polling method.
     */
    if (polling) {
      request.polling();
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
createAccountLink('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>');
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "205",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "79a81038-7b58-4968-84f3-d148fe6c943c",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "210",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAccountLink()](viewAccountLink.Readme.md) function to acquire the final representation of the Link object.

---
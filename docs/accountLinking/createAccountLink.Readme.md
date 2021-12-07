
# Create A Link

`Here, createAccountLink(identifierType, identifier) creates a POST request to /accounts/{identifierType}/{identifier}/links`

> `Provided with a valid object representation, this endpoint allows a new link to be created for a specific account.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
    "sourceAccountIdentifiers": [
        {
            "key": "accountid",
            "value": "2999"
        }
    ],
    "status": "active",
    "mode": "both",
    "customData": [
        {
        "key": "keytest",
        "value": "keyvalue"
        }
    ],
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "12345"
  }
});

/**
 * Set up your function to be invoked
 */
const createAccountLink = async (identifierType, identifier) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.createAccountLink(identifierType, identifier);

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
createAccountLink('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>');
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
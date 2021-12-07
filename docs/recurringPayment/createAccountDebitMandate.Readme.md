# Create A Debit Mandate

`Here, createAccountDebitMandate(identifierType, identifier) creates a POST request to /accounts/{identifierType}/{identifier}/debitmandates`

> `Provided with a valid object representation, this endpoint allows for a new debit mandate to be created for a specific account.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
   "payee": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
    "requestDate": "2018-07-03T10:43:27.405Z",
    "startDate": "2018-07-03T10:43:27.405Z",
    "currency": "GBP",
    "amountLimit": "1000.00",
    "endDate": "2028-07-03T10:43:27.405Z",
    "numberOfPayments": "2",
    "frequencyType": "sixmonths",
    "customData": [
        {
        "key": "keytest",
        "value": "keyvalue"
        }
    ]
});

/**
 * Set up your function to be invoked
 */
const createAccountDebitMandate = async (identifierType, identifier) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.createAccountDebitMandate(identifierType, identifier);

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
createAccountDebitMandate('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>');
```

### Example Output - Callback
```javascript
202

{
  "serverCorrelationId": "f2fbaf72-5ca7-46df-ba9d-e8cda6bd267d",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "153",
  "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "1bca17a5-fe2f-45cc-87dc-d65502507031",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "152",
  "pollLimit": 100
}
```
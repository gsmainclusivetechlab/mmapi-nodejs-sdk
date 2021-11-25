# Create A Disbursement Transaction

`Here, createDisbursementTransaction() creates a POST request to /transactions/type/disbursement`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'disbursement' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "currency": "RWF"
});

/**
 * Set up your function to be invoked
 */
const createDisbursementTransaction = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.createDisbursementTransaction();

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
createDisbursementTransaction();
```

### Example Output - Callback
```javascript
202

{
  "serverCorrelationId": "208108a9-18f7-4b11-8c50-cbb13e25c39d",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "8331",
  "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "208108a9-18f7-4b11-8c50-cbb13e25c39d",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "8331",
  "pollLimit": 100
}
```
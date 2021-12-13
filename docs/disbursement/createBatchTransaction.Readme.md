# Create A Transaction Batch

`Here, createBatchTransaction() creates a POST request to /batchtransactions`

> `Provided with a valid object representation, this endpoint allows for a new transaction batch to be created`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createBatchTransaction = async (body, polling = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createBatchTransaction();
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameter
     */
    request.transactions(body.transactions);
    request.batchTitle(body.batchTitle);
    request.batchDescription(body.batchDescription);
    request.scheduledStartDate(body.scheduledStartDate);

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
createBatchTransaction('<<REPLACE-WITH-REQUEST-BODY>>');
```

### Example Output - Callback

```javascript
202

{
  "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "429",
  "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "f91e19ec-5116-4491-a447-11cfc2bc7f93",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "920",
  "pollLimit": 100
}
```

## Update A Transaction Batch

`Here, updateBatchTransaction(batchId) creates a PATCH request to /batchtransactions/{batchId}`

> `This endpoint updates a specific transaction batch. Only the batchStatus field can be modified.`

### Usage / Examples
```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ([
  {
    "op": "replace",
    "path": "/batchStatus",
    "value": "approved"
  }
]);

/**
 * Set up your function to be invoked
 */
const updateBatchTransaction = async (batchId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.updateBatchTransaction(batchId);

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

updateBatchTransaction('<<REPLACE-WITH-BATCH-ID>>');
```

### Example Output - Callback
```javascript
202

{
  "serverCorrelationId": "ade88ed4-decc-4e29-9c24-0c362b2ec284",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "493",
  "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "ad221629-1d95-4832-ae46-62d86146d7e0",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "750",
  "pollLimit": 100
}
```
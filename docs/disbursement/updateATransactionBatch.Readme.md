## Update A Transaction Batch

`Here, UpdateATransactionBatchRequest(batchId) creates a PATCH request to /batchtransactions/{batchId}`

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
const updateATransactionBatch = async (batchId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.UpdateATransactionBatchRequest(batchId);

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

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
     * Return an error response
     */
    return err;
  }
};

updateATransactionBatch('REPLACE-WITH-BATCH-ID');
```

### Example Output
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

# Update A Transaction Batch

`Here, updateBatchTransaction(batchId) creates a PATCH request to /batchtransactions/{batchId}`

> `This endpoint updates a specific transaction batch. Only the batchStatus field can be modified. The Batch Status is set to 'approved'`

### Usage / Examples

```javascript
/**
 * Set up your function to be invoked
 */
const updateBatchTransaction = async (batchId, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.updateBatchTransaction(batchId);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(callbackUrl);
    }

    if (debug) {
      console.log("Request: ", JSON.stringify(request, null, 4));
    }

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);

    if (debug) {
      console.log("Response Status: ", response.status);
      console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    }

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    if (debug) {
      console.log(err);
    }

    /**
     * Return an error response
     */
    return err;
  }
};

updateBatchTransaction('<<REPLACE-WITH-BATCH-ID>>', false, true);
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

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewBatchTransaction()](viewBatchTransaction.Readme.md) function to acquire the final representation of the Batch Transaction object.

---
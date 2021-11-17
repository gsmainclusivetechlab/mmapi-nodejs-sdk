# View Batch Completions

`Here, viewBatchCompletions(batchId) creates a GET request to /batchtransactions/{batchId}/completions`

> `This endpoint returns completed transactions for a specific batch.`

### Usage / Examples
```javascript
/**
 * Set up your function to be invoked
 */
const viewBatchCompletions = async (batchId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchCompletions(batchId);

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
viewBatchCompletions('<<REPLACE-WITH-BATCH-ID>>');
```

### Example Output
```javascript
200

[]
```

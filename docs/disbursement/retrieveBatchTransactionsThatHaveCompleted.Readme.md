# Retrieve Batch Transactions That Have Completed Request

### Usage/Examples

```javascript
const retrieveBatchTransactionsThatHaveCompleted  = async (batchId) => {
  try{
    // Construct a request object and set desired parameters
    // Here, RetrieveBatchTransactionsThatHaveCompletedRequest(batchId) creates a GET request to /batchtransactions/{batchId}/completions
    const request = new mmapi.disbursement.RetrieveBatchTransactionsThatHaveCompletedRequest(batchId);

    // Call API with your client and get a response for your call
    const response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
retrieveBatchTransactionsThatHaveCompleted('REF-1635509903380')
```

### Expected Output
```javascript
  200

  []
```

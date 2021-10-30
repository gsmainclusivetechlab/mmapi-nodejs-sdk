# Retrieve Batch Transactions That Have Been Rejected Request

### Usage/Examples

```javascript
const retrieveBatchTransactionsThatHaveBeenRejected  = async (batchId) => {
  try{
    // Construct a request object and set desired parameters
    // Here, RetrieveBatchTransactionsThatHaveBeenRejectedRequest(batchId) creates a GET request to /batchtransactions/{batchId}/rejections
    const request = new mmapi.disbursement.RetrieveBatchTransactionsThatHaveBeenRejectedRequest(batchId);

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
retrieveBatchTransactionsThatHaveBeenRejected('REF-1635509903380')
```

### Expected Output
```javascript
  200

  []
```

## Update A Transaction Batch

### Code to Execute

```javascript
const buildRequestBody = () => ([{"op":"replace","path":"/batchStatus","value":"approved"}]);

let updateATransactionBatch  = async (batchId) => {
  try{
      // Construct a request object and set desired parameters
      // Here, UpdateATransactionBatchRequest(batchId) creates a PATCH request to /batchtransactions/{batchId}
      const request = new mmapi.disbursement.UpdateATransactionBatchRequest();
      // Set request body
      request.data = buildRequestBody();

      // Call API with your client and get a response for your call
      const response = await client.execute(request);
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Data: ${response.data}`);
      console.log(`Response Header: ${response.headers}`);

      return response;
  } catch (e) {
      console.log(e)
  }
}
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

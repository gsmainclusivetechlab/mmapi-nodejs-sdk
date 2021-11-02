# View A Transaction Batch

### Usage / Examples

```javascript
const viewATransactionBatch  = async (batchId) => {
  try{
    // Construct a request object and set desired parameters
    // Here, ViewATransactionBatchRequest(batchId) creates a GET request to /batchtransactions/{batchId}
    const request = new mmapi.disbursement.ViewATransactionBatchRequest(batchId);

    // Call API with your client and get a response for your call
    const response = await client.execute(request);
    console.log(`Response Status: ${ response.status } `);
    console.log(`Response Header: ${ response.headers } `);
    console.log(`Response Data: ${ response.data } `);

    return response;
  } catch (e) {
    console.log(e)
  }
}
viewATransactionBatch('REPLACE-WITH-BATCH-ID')
```

### Expected Output
  ```javascript
  200

  {
    "batchId": "REF-1635846330263",
    "batchStatus": "created",
    "batchTitle": "Batch_Test",
    "batchDescription": "Testing a Batch",
    "processingFlag": false,
    "completedCount": 0,
    "rejectionCount": 0,
    "parsingSuccessCount": 0,
    "scheduledStartDate": "2019-12-11T15:08:03",
    "creationDate": "2021-11-02T09:45:30",
    "modificationDate": "2021-11-02T09:45:30",
    "requestDate": "2021-11-02T09:45:30"
  }
```

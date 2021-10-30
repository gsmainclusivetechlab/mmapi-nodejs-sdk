## Perform a Bulk Disbursement

### Code to Execute

```javascript
const buildRequestBody = () => ({"transactions":[{"amount":"200.00","type":"transfer","creditParty":[{"key":"accountid","value":"2000"}],"currency":"RWF","debitParty":[{"key":"accountid","value":"2999"}]},{"amount":"200.00","type":"transfer","creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF","debitParty":[{"key":"accountid","value":"2000"}]}],"batchTitle":"Batch_Test","batchDescription":"Testing a Batch","scheduledStartDate":"2019-12-11T15:08:03.158Z"});

let performABulkDisbursement  = async () => {
  try{
      // Construct a request object and set desired parameters
      // Here, PerformABulkDisbursementRequest() creates a POST request to /batchtransactions
      const request = new mmapi.disbursement.PerformABulkDisbursementRequest();
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
performABulkDisbursement();
```

### Expected Output
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

# Perform An Individual Disbursement

### Usage/Examples

```javascript
const buildRequestBody = () => ({"amount":"200.00","debitParty":[{"key":"accountid","value":"2999"}],"creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF"});

const performAnIndividualDisbursement  = async () => {
  try{
    // Construct a request object and set desired parameters
    // Here, PerformAnIndividualDisbursement() creates a POST request to /transactions/type/disbursement
    const request = new mmapi.disbursement.PerformAnIndividualDisbursementRequest();
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
performAnIndividualDisbursement()
```

  
### Expected Output
```javascript
  202

  {
    "serverCorrelationId": "208108a9-18f7-4b11-8c50-cbb13e25c39d",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "8331",
    "pollLimit": 100
  }
```
# Perform An Individual Disbursement Via Polling

### Usage/Examples

```javascript
const buildRequestBody = () => ({"amount":"200.00","debitParty":[{"key":"accountid","value":"2999"}],"creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF"});

const performAnIndividualDisbursementViaPolling  = async () => {
  try{
    // Construct a request object and set desired parameters
    // Here, performAnIndividualDisbursementViaPolling() creates a POST request to /transactions/type/disbursement
    const request = new mmapi.disbursement.performAnIndividualDisbursementViaPollingRequest();
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
performAnIndividualDisbursementViaPolling()
```

  
### Expected Output
```javascript
  202

   {
    "serverCorrelationId": "0b06797e-75cb-4c53-a628-151e85ec7e28",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "8332",
    "pollLimit": 100
  }
```
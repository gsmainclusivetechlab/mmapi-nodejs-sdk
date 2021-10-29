# Poll To Determine The Request State

### Code To Execute

```javascript
const pollToDetermineTheRequestState  = async (serverCorrelationId) => {
  try{
    // Construct a request object and set desired parameters
    // Here, PollToDetermineTheRequestRequest(serverCorrelationId) creates a GET request to /requeststates/{serverCorrelationId}
    let request = new mmapi.common.PollToDetermineTheRequestRequest(serverCorrelationId);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
pollToDetermineTheRequest('8626661d-2b3a-4166-b3d2-33a0c5fccd35')
```

### Example Output

```javascript
  200

  {
    "serverCorrelationId": "8626661d-2b3a-4166-b3d2-33a0c5fccd35",
    "status": "completed",
    "notificationMethod": "callback",
    "objectReference": "REF-1635488317033",
    "pollLimit": 100
  }
```

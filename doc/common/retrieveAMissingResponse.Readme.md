# Retrieve A Missing Response

### Code To Execute

```javascript
const retrieveAMissingResponse  = async () => {
  try{
    // Construct a request object and set desired parameters
    // Here, RetrieveAMissingResponseRequest(clientCorrelationId) creates a GET request to /responses/{clientCorrelationId}
    let request = new mmapi.common.RetrieveAMissingResponseRequest(clientCorrelationId);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
retrieveAMissingResponse(clientCorrelationId)
```

### Expected Output

```javascript
  200

  {
    "link": "/transactions/REF-1635433380991"
  }
```
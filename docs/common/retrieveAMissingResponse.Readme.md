## Retrieve A Missing Response

> In some circumstances, the caller may not have received the final representation of the resource for which it attempted to create. This use case allows a caller to retrieve a representation of the resource assuming that it exists. The provider will use the Client Correlation Id to identify the requested resource and return a link to that resource.
 
### Code To Execute

```javascript
const retrieveAMissingResponse  = async (clientCorrelationId) => {
  try{
    // Construct a request object and set desired parameters
    // Here, RetrieveAMissingResponseRequest(clientCorrelationId) creates a GET request to /responses/{clientCorrelationId}
    let request = new mmapi.common.RetrieveAMissingResponseRequest(clientCorrelationId);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
retrieveAMissingResponse('REPLACE-WITH-CLIENT-CORRELATION-ID')
```

### Example Output

```javascript
  200

  {
    "link": "/transactions/REF-1635433380991"
  }
```

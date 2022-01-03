# View A Request State

`Here, viewRequestState(serverCorrelationId) creates a GET request to /requeststates/{serverCorrelationId}`

> `This endpoint returns a specific request state`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewRequestState = async (serverCorrelationId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.viewRequestState(serverCorrelationId);
    console.log('Request: ', request);

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    console.log(err);

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
viewRequestState('<<REPLACE-WITH-SERVER-CORRELATION-ID>>');
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

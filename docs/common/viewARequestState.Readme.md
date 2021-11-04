# View A Request State

`Here, ViewARequestState(serverCorrelationId) creates a GET request to /requeststates/{serverCorrelationId}`

> `This endpoint returns a specific request state`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewARequestState = async (serverCorrelationId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.common.ViewARequestStateRequest(serverCorrelationId);

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
viewARequestState('REPLACE-WITH-SERVER-CORRELATION-ID')
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

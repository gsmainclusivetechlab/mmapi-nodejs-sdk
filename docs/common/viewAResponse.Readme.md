# View A Response

`Here, ViewAResponseRequest(clientCorrelationId) creates a GET request to /responses/{clientCorrelationId}`

> `This endpoint returns a specific response.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAResponse = async (clientCorrelationId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.common.ViewAResponseRequest(clientCorrelationId);

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
viewAResponse('REPLACE-WITH-CLIENT-CORRELATION-ID')
```

### Example Output

```javascript
200

{
  "link": "/transactions/REF-1635433380991"
}
```

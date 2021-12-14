# View A Response

`Here, viewResponse(clientCorrelationId) creates a GET request to /responses/{clientCorrelationId}`

> `This endpoint returns a specific response.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewResponse = async (clientCorrelationId) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewResponse(clientCorrelationId);
    console.log("Request: ", request);

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
viewResponse('<<REPLACE-WITH-CLIENT-CORRELATION-ID>>');
```

### Example Output

```javascript
200

{
  "link": "/transactions/REF-1635433380991"
}
```

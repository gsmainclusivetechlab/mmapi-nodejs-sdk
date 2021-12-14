# Check Api Availability

`Here, viewServiceAvailability() creates a GET request to /heartbeat`

> `This endpoint returns the current status of the API`

### Usage/Examples

```javascript
const viewServiceAvailability = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.viewServiceAvailability();
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
    console.log(err)

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
viewServiceAvailability();
```

### Example Output

```javascript
200

{
  "serviceStatus": "available"
}
```

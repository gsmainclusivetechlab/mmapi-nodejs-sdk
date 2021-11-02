# Check Api Availability

`Here, CheckApiAvailabilityRequest() creates a GET request to /heartbeat`

> `This endpoint returns the current status of the API`

### Usage/Examples

```javascript
const checkApiAvailability = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.common.CheckApiAvailabilityRequest();

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Respoanse Data: ", JSON.stringify(response.data, null, 4));
    console.log("Respoanse Headers: ", response.headers);

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

checkApiAvailability();
```

### Example Output

```javascript
200

{
  "serviceStatus": "available"
}
```

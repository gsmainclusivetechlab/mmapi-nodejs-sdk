# Check For Service Availability

> This use case enables the caller to determine the availability of the service from the API provider. The provider will return a status of ‘available’, ‘unavailable’ or ‘degraded’.

`GET /heartbeat`
   
### Code To Execute

```javascript
const checkForServiceAvailability  = async () => {
  try{
    // Construct a request object and set desired parameters
    // Here, CheckForServiceAvailabilityRequest() creates a GET request to /heartbeat
    let request = new mmapi.common.CheckForServiceAvailabilityRequest();

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Headers: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);
    
    return response;
  } catch (e) {
    console.log(e)
  }
}
checkForServiceAvailability()
```

### Expected Output

```javascript
  200

  {
    "serviceStatus": "available"
  }
```

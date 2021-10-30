# Check For Service Availability
  
### Usage/Examples

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

### Example Output

```javascript
  200

  {
    "serviceStatus": "available"
  }
```

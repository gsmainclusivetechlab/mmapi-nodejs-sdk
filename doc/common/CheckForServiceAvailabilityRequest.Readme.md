# Check for Service Availability

### Code to Execute

```javascript
let checkForServiceAvailabilityRequest  = async function() {
  try{
    let request = new mmapi.common.CheckForServiceAvailabilityRequest();

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
   } catch (e) {
    console.log(e)
  }
}
checkForServiceAvailabilityRequest()
```

### Expected Output

```javascript
  200

  {
    "serviceStatus": "available"
  }
```
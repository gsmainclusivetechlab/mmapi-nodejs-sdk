# Check For Service Availability
  
### Usage/Examples

```javascript
// 1a. Import the SDK package
const mmapi = require('mmapi-nodejs-sdk');

// 1b. Import the MMAPI SDK client that was created in `Set up Server-Side SDK`.
const { client } = require('<REPLACE-WITH-RELATIVE-PATH-TO-CLIENT-FILE>');

// 2. Set up your server to receive a call from the client
const checkForServiceAvailability = async () => {

  // 3. Construct a request object and set desired parameters.
  // Here, CheckForServiceAvailabilityRequest() creates a GET request to /heartbeat
  let request = new mmapi.common.CheckForServiceAvailabilityRequest();

  try {
    // 4a. Call API with your client and get a response for your call
    let response = await client.execute(request);
    // 5a. Return a successful response to the client
    return response;
  } catch (err) {
    // 4b. Handle any errors from the call
    console.error(err);
    // 5b. Return a error response to the client
    return err;
  }
}

module.exports = { checkForServiceAvailability }
```

### Example Output

```javascript
  200

  {
    "serviceStatus": "available"
  }
```

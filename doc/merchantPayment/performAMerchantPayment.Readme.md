
# Perform A Merchant Payment

### Usage/Examples

```javascript
const buildRequestBody = () => ({"amount":"200.00","debitParty":[{"key":"accountid","value":"2999"}],"creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF"});

const buildXCallbackURL = () => 'https://www.example.com';

const performAMerchantPayment  = async () => {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAMerchantPaymentRequest() creates a POST request to /transactions/type/merchantpay
    const request = new mmapi.merchantPayment.PerformAMerchantPaymentRequest();
    request.data = buildRequestBody();
    request.headers['X-Callback-URL'] = buildXCallbackURL();

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
performAMerchantPayment()
```

### Expected Output
```javascript
  202

  {
    "serverCorrelationId": "d461c480-2a9a-4b77-816f-e41bff09017e",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "8090",
    "pollLimit": 100
  }
```
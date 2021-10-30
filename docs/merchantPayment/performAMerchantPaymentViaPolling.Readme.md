
# Perform A Merchant Payment Via Polling

### Usage/Examples

```javascript
const buildRequestBody = () => ({"amount":"200.00","debitParty":[{"key":"accountid","value":"2999"}],"creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF"});

const performAMerchantPaymentViaPolling  = async () => {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAMerchantPaymentViaPollingRequest() creates a POST request to /transactions/type/merchantpay
    const request = new mmapi.merchantPayment.PerformAMerchantPaymentViaPollingRequest();
    // Set request body
    request.data = buildRequestBody();

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
performAMerchantPaymentViaPolling()
```

### Example Output
```javascript
  202

  {
    "serverCorrelationId":"aba7bc18-557d-496f-ae94-c2081b279960",
    "status":"pending",
    "notificationMethod":"polling",
    "objectReference":"8172",
    "pollLimit":100
  }
```

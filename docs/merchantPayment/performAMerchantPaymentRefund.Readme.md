
# Perform A Merchant Payment Refund Request

### Usage/Examples

```javascript
const buildRequestBody = () => ({"amount":"200.00","debitParty":[{"key":"accountid","value":"2999"}],"creditParty":[{"key":"accountid","value":"2999"}],"currency":"RWF"});

const performAMerchantPaymentRefund  = async () => {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAMerchantPaymentRefundRequest() creates a POST request to /transactions/type/adjustment
    const request = new mmapi.merchantPayment.PerformAMerchantPaymentRefundRequest();
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
performAMerchantPaymentRefund()
```

### Example Output
```javascript
  202

  {
    "serverCorrelationId": "233b226e-a2da-48f7-8510-9c79a352906b",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "8182",
    "pollLimit": 100
  }
```

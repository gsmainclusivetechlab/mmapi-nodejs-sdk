# Perform A Transaction Reversal

### Code To Execute

```javascript
const performATransactionReversal = async (originalTransactionReference) => {
  try{
    // Construct a request object and set desired parameters
    // Here, PerformATransactionReversalRequest(originalTransactionReference) creates a POST request to /transactions/{originalTransactionReference}/reversals
    let request = new mmapi.common.PerformATransactionReversalRequest(originalTransactionReference);

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
performATransactionReversal('REPLACE-WITH-ORIGINAL-TRANSACTION-REFERENCE')
```

### Example Output

```javascript
  202

  {
    "serverCorrelationId": "66b3e91a-1d36-41a6-8f4a-833ef1f9d125",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "8287",
    "pollLimit": 100
  }
```

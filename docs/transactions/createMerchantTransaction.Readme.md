
# Create A MerchantPay Transaction

`Here, createMerchantTransaction() creates a POST request to /transactions/type/merchantpay`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'merchantpay' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "currency": "RWF"
});

/**
 * Set up your function to be invoked
 */
const createMerchantTransaction = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.transactions.createMerchantTransaction();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

    /**
     * Chose the polling method.
     */
    request.polling();

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    console.log("Response Headers: ", response.headers);

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    console.log(err);

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
createMerchantTransaction();
```

### Example Output - Callback
```javascript
202

{
  "serverCorrelationId": "2e9ce6e1-8bbc-4938-9274-418c28e78f80",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "9122",
  "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "2e9ce6e1-8bbc-4938-9274-418c28e78f80",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "9122",
  "pollLimit": 100
}
```
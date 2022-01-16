# Create A Withdrawal Transaction

`Here, createWithdrawalTransaction() creates a POST request to /transactions/type/withdrawal`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'withdrawal' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createWithdrawalTransaction = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.createWithdrawalTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.amount("200.00");
    request.debitParty([{ "key": "accountid", "value": "2999" }]);
    request.creditParty([{ "key": "accountid", "value": "2999" }]);
    request.currency("RWF");

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(callbackUrl);
    }

    if (debug) {
      console.log("Request: ", JSON.stringify(request, null, 4));
    }

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);

    if (debug) {
      console.log("Response Status: ", response.status);
      console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    }

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    if (debug) {
      console.log(err);
    }

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Invoke the function
 */
createWithdrawalTransaction(false, true);
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "6b697191-febd-4ede-aaaa-2c4114774f3a",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "20522",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "6b697191-febd-4ede-aaaa-2c4114774f3a",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "20522",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewTransaction()](viewTransaction.Readme.md) function to acquire the final representation of the Transaction object.

---
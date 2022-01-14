
# Create A Transfer Transaction

`Here, createTransferTransaction() creates a POST request to /transactions/type/transfer`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'transfer' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createTransferTransaction = async (linkref, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.accountLinking.createTransferTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.amount("200.00");
    request.creditParty([{ "key": "linkref", "value": `${linkref}` }]);
    request.currency("RWF");
    request.debitParty([{ "key": "accountid", "value": "2999" }]);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(process.env.CALLBACK_URL);
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
createTransferTransaction('<<REPLACE-WITH-LINK-REF>>', false, true)
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "85025241-57e6-49b7-b9b4-84c45974a75f",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "14452",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "b501aeeb-c3b8-45d8-9fc7-375fb42ea87e",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "14457",
  "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewTransaction()](viewTransaction.Readme.md) function to acquire the final representation of the Transaction object.

---
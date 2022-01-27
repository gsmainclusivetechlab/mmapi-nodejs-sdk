# Create A Transaction Batch

`Here, createBatchTransaction() creates a POST request to /batchtransactions`

> `Provided with a valid object representation, this endpoint allows for a new transaction batch to be created`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createBatchTransaction = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createBatchTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.transactions([
      {
        "amount": "16.00",
        "type": "transfer",
        "creditParty": [
          {
            "key": "msisdn",
            "value": "+44012345678"
          }
        ],
        "currency": "USD",
        "debitParty": [
          {
            "key": "walletid",
            "value": "1"
          }
        ]
      },
      {
        "amount": "16.00",
        "type": "transfer",
        "creditParty": [
          {
            "key": "msisdn",
            "value": "+44012345678"
          }
        ],
        "currency": "USD",
        "debitParty": [
          {
            "key": "walletid",
            "value": "1"
          }
        ]
      }
    ]);
    request.batchTitle("Batch_Test");
    request.batchDescription("Testing a Batch");
    request.scheduledStartDate("2019-12-11T15:08:03.158Z");

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
createBatchTransaction(false, true);
```

### Example Output - Callback

```javascript
202

{
  "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "429",
  "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "f91e19ec-5116-4491-a447-11cfc2bc7f93",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "920",
  "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewBatchTransaction()](viewBatchTransaction.Readme.md) function to acquire the final representation of the Batch Transaction object.

---
# Create A Bill Payment

`Here, createBillPayment({ identifierType1: identifier1 }, billReference) creates a POST request to /accounts/{identifierType}/{identifier}/bills/{billReference}/payments`

> `Provided with a valid object representation, this endpoint allows for a new bill payment to be created for a specific account where one identifier suffices to uniquely identify an account.`

`Here, createBillPayment({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }, billReference) creates a POST request to /accounts/{AccountIdentifiers}/bills/{billReference}/payments`

> `Provided with a valid object representation, this endpoint allows for a new bill payment to be created for a specific account where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createBillPayment = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.billPayment.createBillPayment({ "accountid": "1" }, "REF-000001");

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.currency("GBP");
    request.amountPaid("5.30");

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
createBillPayment(false, true);
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "1227",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "62309a7d-e0af-491d-b61c-677feead1908",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "1234",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewBillPayment()](viewBillPayment.Readme.md) function to acquire the final representation of the Bill Payment object.

---
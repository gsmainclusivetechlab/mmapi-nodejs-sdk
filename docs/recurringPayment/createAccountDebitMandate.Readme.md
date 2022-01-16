# Create A Debit Mandate

`Here, createAccountDebitMandate({ identifierType1: identifier1 }) creates a POST request to /accounts/{identifierType}/{identifier}/debitmandates`

> `Provided with a valid object representation, this endpoint allows for a new debit mandate to be created for a specific account where one identifier suffices to uniquely identify an account. Note that the payer account is identified in the path whereas the payee account is identified in the request body.`

`Here, createAccountDebitMandate({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a POST request to /accounts/{AccountIdentifiers}/debitmandates`

> `Provided with a valid object representation, this endpoint allows for a new debit mandate to be created for a specific account where a single identifier is not sufficient to identify an account. Note that the payer account is identified in the path whereas the payee account is identified in the request body.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createAccountDebitMandate = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.createAccountDebitMandate({ "accountid": "2000" });

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.payee([{ "key": "accountid", "value": "2999" }]);
    request.requestDate("2018-07-03T10:43:27.405Z");
    request.startDate("2018-07-03T10:43:27.405Z");
    request.currency("GBP");
    request.amountLimit("1000.00");
    request.endDate("2028-07-03T10:43:27.405Z");
    request.numberOfPayments("2");
    request.frequencyType("sixmonths");
    request.customData([{ "key": "keytest", "value": "keyvalue" }]);

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
createAccountDebitMandate(false, true);
```

### Example Output - Callback

```javascript
202

{
  "serverCorrelationId": "f2fbaf72-5ca7-46df-ba9d-e8cda6bd267d",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "153",
  "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "1bca17a5-fe2f-45cc-87dc-d65502507031",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "152",
  "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAccountDebitMandate()](viewAccountDebitMandate.Readme.md) function to acquire the final representation of the Debit Mandate object.

---
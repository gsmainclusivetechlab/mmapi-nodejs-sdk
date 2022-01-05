

# Create A Refund Transaction

`Here, createRefundTransaction() creates a POST request to /transactions/type/adjustment`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'adjustment' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createRefundTransaction = async (body, callback = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.createRefundTransaction();
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.requestingOrganisationTransactionReference(body.requestingOrganisationTransactionReference);
    request.originalTransactionReference(body.originalTransactionReference);
    request.creditParty(body.creditParty);
    request.debitParty(body.debitParty);
    request.type(body.type);
    request.subType(body.subType);
    request.amount(body.amount);
    request.currency(body.currency);
    request.descriptionText(body.descriptionText);
    request.fees(body.fees);
    request.geoCode(body.geoCode);
    request.internationalTransferInformation(body.internationalTransferInformation);
    request.oneTimeCode(body.oneTimeCode);
    request.recipientKyc(body.recipientKyc);
    request.senderKyc(body.senderKyc);
    request.requestingOrganisation(body.requestingOrganisation);
    request.servicingIdentity(body.servicingIdentity);
    request.requestDate(body.requestDate);
    request.customData(body.customData);
    request.metadata(body.metadata);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(process.env.CALLBACK_URL);
    }

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));

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
createRefundTransaction('<<REPLACE-WITH-REQUEST-BODY>>');
```

### Example Output - Callback

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

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "a0913b62-a7e1-4641-98fa-f93750413600",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "14208",
  "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewTransaction()](viewTransaction.Readme.md) function to acquire the final representation of the Transaction object.

---

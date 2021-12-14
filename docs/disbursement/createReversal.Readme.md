# Create A Reversal

`Here, createReversal(originalTransactionReference) creates a POST request to /transactions/{transactionReference}/reversals`

> `Provided with a valid object representation, this endpoint allows for a new reversal to be created`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createReversal = async (body, originalTransactionReference, polling = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createReversal(originalTransactionReference);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameter
     */
    request.creditParty(body.creditParty);
    request.debitParty(body.debitParty);
    request.type(body.type);
    request.subType(body.subType);
    request.amount(body.amount);
    request.currency(body.currency);
    request.descriptionText(body.descriptionText);
    request.fees(body.fees);
    request.geoCode(body.geoCode);
    request.requestingOrganisation(body.requestingOrganisation);
    request.servicingIdentity(body.servicingIdentity);
    request.requestDate(body.requestDate);
    request.customData(body.customData);
    request.metadata(body.metadata);

    /**
     * Chose the polling method.
     */
    if (polling) {
      request.polling();
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
createReversal('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ORIGINAL-TRANSACTION-REFERENCE>>');
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

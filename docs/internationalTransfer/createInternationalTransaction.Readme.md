# Create A Int Transfer Transaction

`Here, createInternationalTransaction() creates a POST request to /transactions/type/{transactionType}`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'inttransfer' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createInternationalTransaction = async (body, polling = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createInternationalTransaction();

    /**
     * Set the request body parameter
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
createInternationalTransaction('<<REPLACE-WITH-REQUEST-BODY>>');
```

### Example Output - Callback

```javascript
202

{
  "serverCorrelationId": "848542b2-8c3c-47e8-b3ec-9c2bad3f9916",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "11582",
  "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
  "serverCorrelationId": "6d4ca881-8b73-4036-8385-4364ba47bbbc",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "13728",
  "pollLimit": 100
}
```
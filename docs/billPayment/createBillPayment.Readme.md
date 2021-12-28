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
const createBillPayment = async (body, accountIdentifiers, billReference, callback = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.billPayment.createBillPayment(accountIdentifiers, billReference);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.serviceProviderPaymentReference(body.serviceProviderPaymentReference);
    request.requestingOrganisationTransactionReference(body.requestingOrganisationTransactionReference);
    request.paymentType(body.paymentType);
    request.amountPaid(body.amountPaid);
    request.currency(body.currency);
    request.customerReference(body.customerReference);
    request.requestingOrganisation(body.requestingOrganisation);
    request.supplementaryBillReferenceDetails(body.supplementaryBillReferenceDetails);
    request.requestDate(body.requestDate);
    request.customData(body.customData);
    request.metadata(body.metadata);

    /**
     * Chose the callback method.
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
createBillPayment('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>', '<<REPLACE-WITH-BILL-REFERENCE>>');
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
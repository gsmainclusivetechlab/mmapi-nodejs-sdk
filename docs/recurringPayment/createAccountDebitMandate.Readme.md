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
const createAccountDebitMandate = async (body, accountIdentifiers, polling = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.createAccountDebitMandate(accountIdentifiers);
    console.log('Request X-CorrelationID', request.headers['X-CorrelationID']);

    /**
     * Set the request body parameter
     */
    request.payee(body.payee);
    request.requestDate(body.requestDate);
    request.startDate(body.startDate);
    request.currency(body.currency);
    request.amountLimit(body.amountLimit);
    request.endDate(body.endDate);
    request.numberOfPayments(body.numberOfPayments);
    request.frequencyType(body.frequencyType);
    request.customData(body.customData);
    request.requestingOrganisation(body.requestingOrganisation);
    request.mandateStatus(body.mandateStatus);

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
createAccountDebitMandate('<<REPLACE-WITH-REQUEST-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>');
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
# Create A Int Transfer Transaction

`Here, createInternationalTransaction() creates a POST request to /transactions/type/{transactionType}`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'inttransfer' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createInternationalTransaction = async (quotationReference, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createInternationalTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.creditParty([{ "key": "msisdn", "value": "+44012345678" }]);
    request.debitParty([{ "key": "walletid", "value": "1" }]);
    request.amount("100.00");
    request.currency("GBP");
    request.internationalTransferInformation({
      "originCountry": "GB",
      "quotationReference": `${quotationReference}`,
      // "quoteId": "{{quoteId}}",
      "receivingCountry": "RW",
      "remittancePurpose": "personal",
      "relationshipSender": "none",
      "deliveryMethod": "agent",
      "sendingServiceProviderCountry": "AD"
    });
    request.senderKyc({
      "nationality": "GB",
      "dateOfBirth": "1970-07-03T11:43:27.405Z",
      "occupation": "Manager",
      "employerName": "MFX",
      "contactPhone": "+447125588999",
      "gender": "m",
      "emailAddress": "luke.skywalkeraaabbb@gmail.com",
      "birthCountry": "GB",
      "idDocument": [
        {
          "idType": "nationalidcard",
          "idNumber": "1234567",
          "issueDate": "2018-07-03T11:43:27.405Z",
          "expiryDate": "2021-07-03T11:43:27.405Z",
          "issuer": "UKPA",
          "issuerPlace": "GB",
          "issuerCountry": "GB",
          "otherIdDescription": "test"
        }
      ],
      "postalAddress": {
        "country": "GB",
        "addressLine1": "111 ABC Street",
        "city": "New York",
        "stateProvince": "New York",
        "postalCode": "ABCD"
      },
      "subjectName": {
        "title": "Mr",
        "firstName": "Luke",
        "middleName": "R",
        "lastName": "Skywalker",
        "fullName": "Luke R Skywalker",
        "nativeName": "ABC"
      }
    });
    request.requestingOrganisation({
      "requestingOrganisationIdentifierType": "organisationid",
      "requestingOrganisationIdentifier": "testorganisation"
    });

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
createInternationalTransaction('<<REPLACE-WITH-QUOTATION-REFERENCE>>', false, true);
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

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewTransaction()](viewTransaction.Readme.md) function to acquire the final representation of the Transaction object.

---
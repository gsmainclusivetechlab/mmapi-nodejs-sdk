# Create A Int Transfer Transaction

`Here, createInternationalTransaction() creates a POST request to /transactions/type/{transactionType}`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'inttransfer' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
    "amount": "100.00",
    "creditParty": [
        {
            "key": "accountid",
            "value": "2000"
        }
    ],
    "currency": "GBP",
    "debitParty": [
        {
            "key": "accountid",
            "value": "2999"
        }
    ],
    "internationalTransferInformation": {
        "originCountry": "GB",
        "quotationReference": "{{quotationReference}}",
        "quoteId": "{{quoteId}}",
        "receivingCountry": "RW",
        "remittancePurpose": "personal",
        "relationshipSender": "none",
        "deliveryMethod": "agent",
        "sendingServiceProviderCountry": "AD"
   },
    "senderKyc": {
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
     },
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
});

/**
 * Set up your function to be invoked
 */
const createInternationalTransaction = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.createInternationalTransaction();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

    /**
     * Chose the polling method.
     */
    request.polling();

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);

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
createInternationalTransaction();
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
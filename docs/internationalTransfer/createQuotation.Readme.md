# Create A New Quotation

`Here, createQuotation() creates a POST request to /quotations`

> `Provided with a valid object representation, this endpoint allows for a new quotation to be created.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestAmount": "75.30",
  "requestCurrency": "RWF",
  "requestDate": "2018-07-03T11:43:27.405Z",
  "type": "inttransfer",
  "subType": "abc",
  "chosenDeliveryMethod": "agent",
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
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ],
  "sendingServiceProviderCountry": "AD",
  "originCountry": "AD",
  "receivingCountry": "AD"
});

/**
 * Set up your function to be invoked
 */
const createQuotation = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createQuotation();

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
createQuotation();
```

### Example Output - Callback
```javascript
202

{
  "serverCorrelationId": "7a20ef01-996c-4652-95ee-13766f116544",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "535",
  "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "804",
  "pollLimit": 100
}
```
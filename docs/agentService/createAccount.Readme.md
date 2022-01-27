# Create An Account

`Here, createAccount() creates a POST request to /accounts/{identityType}`

> `Provided with a valid object representation, this endpoint allows for a new account to be created, supplying ‘individual’ as the identityType.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const createAccount = async (msisdn, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.createAccount();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.accountIdentifiers([{ "key": "msisdn", "value": `${msisdn}` }]);
    request.identity([
      {
        "identityKyc": {
          "birthCountry": "AD",
          "contactPhone": "+447777777777",
          "dateOfBirth": "2000-11-20",
          "emailAddress": "xyz@xyz.com",
          "employerName": "string",
          "gender": "m",
          "idDocument": [
            {
              "idType": "passport",
              "idNumber": "111111",
              "issueDate": "2018-11-20",
              "expiryDate": "2018-11-20",
              "issuer": "ABC",
              "issuerPlace": "DEF",
              "issuerCountry": "AD"
            }
          ],
          "nationality": "AD",
          "occupation": "Miner",
          "postalAddress": {
            "addressLine1": "37",
            "addressLine2": "ABC Drive",
            "addressLine3": "string",
            "city": "Berlin",
            "stateProvince": "string",
            "postalCode": "AF1234",
            "country": "AD"
          },
          "subjectName": {
            "title": "Mr",
            "firstName": "H",
            "middleName": "I",
            "lastName": "J",
            "fullName": "H I J",
            "nativeName": "string"
          }
        },
        "accountRelationship": "accountholder",
        "kycVerificationStatus": "verified",
        "kycVerificationEntity": "ABC Agent",
        "kycLevel": 1,
        "customData": [
          {
            "key": "test",
            "value": "custom"
          }
        ]
      }
    ]);
    request.accountType("string");
    request.customData([{ "key": "test", "value": "custom1" }]);
    request.fees([{ "feeType": "string", "feeAmount": "5.46", "feeCurrency": "AED" }]);
    request.registeringEntity("ABC Agent");
    request.requestDate("2021-02-17T15:41:45.194Z");

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
createAccount('<<REPLACE-WITH-MSISDN>>', false, true);
```

### Example Output - Callback

```javascript
202

{
    "serverCorrelationId": "1789adf1-ffe4-434d-bb6e-121a325621ba",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "277",
    "pollLimit": 100
}
```

### Example Output - Polling

```javascript
202

{
    "serverCorrelationId": "1789adf1-ffe4-434d-bb6e-121a325621ba",
    "status": "pending",
    "notificationMethod": "polling",
    "objectReference": "277",
    "pollLimit": 100
}
```

---

**NOTE**

In asynchronous flows, a callback mechanism or polling mechanism is utilised to allow the client to determine the request's final state. Use the [viewRequestState()](viewRequestState.Readme.md) function for the polling mechanism to receive the status of a request, and the [viewAccount()](viewAccount.Readme.md) function to acquire the final representation of the Account object.

---
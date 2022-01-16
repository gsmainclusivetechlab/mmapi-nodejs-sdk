# View An Account

`Here, viewAccount({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}`

> `This endpoint returns details for a given account. where one identifier suffices to uniquely identify an account.`

`Here, viewAccount({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{AccountIdentifiers}`

> `This endpoint returns details for a given account. where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccount = async (msisdn, debug = false) => {
    try {
        /**
         * Construct a request object and set desired parameters
         */
        const request = new mmapi.agentService.viewAccount({ "msisdn": `${msisdn}` });

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
viewAccount('<<REPLACE-WITH-MSISDN>>', true);
```

### Example Output

```javascript
200

{
    "accountIdentifiers": [
        {
            "key": "msisdn",
            "value": "+44012345678"
        }
    ],
    "identity": [
        {
            "identityId": "318",
            "identityType": "individual",
            "identityStatus": "active",
            "identityKyc": {
                "nationality": "AD",
                "dateOfBirth": "2000-11-20",
                "occupation": "Miner",
                "employerName": "string",
                "contactPhone": "+447777777777",
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
                },
                "emailAddress": "xyz@xyz.com",
                "birthCountry": "AD"
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
    ],
    "accountType": "string",
    "accountStatus": "available",
    "accountSubStatus": "subStatus",
    "fees": [
        {
            "feeType": "string",
            "feeAmount": "5.46",
            "feeCurrency": "AED"
        }
    ],
    "registeringEntity": "ABC Agent",
    "creationDate": "2022-01-03T08:10:56",
    "requestDate": "2021-02-17T15:41:45",
    "customData": [
        {
            "key": "test",
            "value": "custom1"
        }
    ]
}
```

# Retrieve A Set Of Transactions For An Account

This endpoint returns transactions linked to a specific account.

### Code To Execute

```javascript
const retrieveASetOfTransactionsForAnAccount  = async (identifierType, identifier) => {
  try{
    /**
     * Construct a request object and set desired parameters
     * Here, RetrieveASetOfTransactionsForAnAccountRequest(identifierType, identifier) creates a GET request to /accounts/{identifierType}/{identifier}/transactions
     * @param {string} identifierType - The type of the identifier that is used to identify the account..
     * @param {string} identifier - Path variable that contains the account identifier.
    */
    let request = new mmapi.common.RetrieveASetOfTransactionsForAnAccountRequest(identifierType, identifier);
     /**
     * creates query params 
     * @param {number} offset - Supports pagination. This value will indicate the cursor position from where to retrieve the set of records. For example, a limit of 50 and offset of 10 will return records 11 to 60.
     * @param {number} limit  - Supports pagination. If this is not supplied, then the server will apply a limit of 50 records returned for each request.
     * @returns               - /accounts/{identifierType}/{identifier}/transactions?offset=0&limit=20
    */ 
    request.queryParams(0, 20);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
retrieveASetOfTransactionsForAnAccount('REPLACE-WITH-IDENTIFIER-TYPE', 'REPLACE-WITH-IDENTIFIER')
```

### Example Output

```javascript
  200

  [  
    {
        "transactionReference": "REF-1620028406917",
        "creditParty": [
            {
                "key": "accountid",
                "value": "2000"
            },
            {
                "key": "linkref",
                "value": "REF-1621839627337"
            },
            {
                "key": "linkref",
                "value": "REF-1635445811066"
            }
        ],
        "debitParty": [
            {
                "key": "accountid",
                "value": "2999"
            }
        ],
        "type": "inttransfer",
        "transactionStatus": "completed",
        "amount": "100.00",
        "currency": "GBP",
        "internationalTransferInformation": {
            "originCountry": "GB",
            "quotationReference": "{{quotationReference}}",
            "quoteId": "{{quoteId}}",
            "deliveryMethod": "agent",
            "receivingCountry": "RW",
            "relationshipSender": "none",
            "remittancePurpose": "personal",
            "sendingServiceProviderCountry": "AD"
        },
        "senderKyc": {
            "nationality": "GB",
            "dateOfBirth": "1970-07-03",
            "occupation": "Manager",
            "employerName": "MFX",
            "contactPhone": "+447125588999",
            "gender": "m",
            "idDocument": [
                {
                    "idType": "nationalidcard",
                    "idNumber": "1234567",
                    "issueDate": "2018-07-03",
                    "expiryDate": "2021-07-03",
                    "issuer": "UKPA",
                    "issuerPlace": "GB",
                    "issuerCountry": "GB"
                }
            ],
            "postalAddress": {
                "addressLine1": "111 ABC Street",
                "city": "New York",
                "stateProvince": "New York",
                "postalCode": "ABCD",
                "country": "GB"
            },
            "subjectName": {
                "title": "Mr",
                "firstName": "Luke",
                "middleName": "R",
                "lastName": "Skywalker",
                "fullName": "Luke R Skywalker",
                "nativeName": "ABC"
            },
            "emailAddress": "luke.skywalkeraaabbb@gmail.com",
            "birthCountry": "GB"
        },
        "requestingOrganisation": {
            "requestingOrganisationIdentifierType": "organisationid",
            "requestingOrganisationIdentifier": "testorganisation"
        },
        "creationDate": "2021-05-03T08:53:27",
        "modificationDate": "2021-05-03T08:53:27",
        "requestDate": "2021-05-03T08:53:27"
    },
    ...,
    {
        "transactionReference": "REF-1620133857481",
        "creditParty": [
            {
                "key": "accountid",
                "value": "2000"
            },
            {
                "key": "linkref",
                "value": "REF-1621839627337"
            },
            {
                "key": "linkref",
                "value": "REF-1635445811066"
            }
        ],
        "debitParty": [
            {
                "key": "accountid",
                "value": "2999"
            }
        ],
        "type": "inttransfer",
        "transactionStatus": "pending",
        "amount": "100.00",
        "currency": "GBP",
        "internationalTransferInformation": {
            "originCountry": "GB",
            "quotationReference": "{{quotationReference}}",
            "quoteId": "{{quoteId}}",
            "deliveryMethod": "agent",
            "receivingCountry": "RW",
            "relationshipSender": "none",
            "remittancePurpose": "personal",
            "sendingServiceProviderCountry": "AD"
        },
        "senderKyc": {
            "nationality": "GB",
            "dateOfBirth": "1970-07-03",
            "occupation": "Manager",
            "employerName": "MFX",
            "contactPhone": "+447125588999",
            "gender": "m",
            "idDocument": [
                {
                    "idType": "nationalidcard",
                    "idNumber": "1234567",
                    "issueDate": "2018-07-03",
                    "expiryDate": "2021-07-03",
                    "issuer": "UKPA",
                    "issuerPlace": "GB",
                    "issuerCountry": "GB"
                }
            ],
            "postalAddress": {
                "addressLine1": "111 ABC Street",
                "city": "New York",
                "stateProvince": "New York",
                "postalCode": "ABCD",
                "country": "GB"
            },
            "subjectName": {
                "title": "Mr",
                "firstName": "Luke",
                "middleName": "R",
                "lastName": "Skywalker",
                "fullName": "Luke R Skywalker",
                "nativeName": "ABC"
            },
            "emailAddress": "luke.skywalkeraaabbb@gmail.com",
            "birthCountry": "GB"
        },
        "requestingOrganisation": {
            "requestingOrganisationIdentifierType": "organisationid",
            "requestingOrganisationIdentifier": "testorganisation"
        },
        "creationDate": "2021-05-04T14:10:57",
        "modificationDate": "2021-05-04T14:10:57",
        "requestDate": "2021-05-04T14:10:57"
    }
]
```

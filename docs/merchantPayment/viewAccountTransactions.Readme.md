# View Account Specific Transaction

`Here, viewAccountTransactions({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}/transactions`

> `This endpoint returns transactions linked to a specific account where one identifier suffices to uniquely identify an account.`

`Here, viewAccountTransactions({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{AccountIdentifiers}/transactions.`

> `This endpoint returns transactions linked to a specific account where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountTransactions = async (accountIdentifiers, offset, limit) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.merchantPayment.viewAccountTransactions(accountIdentifiers);

    /**
     * Set the offset parameter
     */
    request.offset(offset);

    /**
     * Set the limit parameter
     */
    request.limit(limit);

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    console.log("Response X-Records-Available-Count", response.headers['x-records-available-count']);
    console.log("Response X-Records-Returned-Count", response.headers['x-records-returned-count']);

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
viewAccountTransactions('<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>', '<<REPLACE-WITH-OFFSET>>', '<<REPLACE-WITH-LIMIT>>');
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

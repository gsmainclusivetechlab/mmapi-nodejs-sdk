# View A Link

`Here, viewAccountLink({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}/links/{linkReference}`

> `This endpoint returns a specific link for a given account where one identifier suffices to uniquely identify an account. Note that to identify the accounts that are to be linked, the target account is specified in the path whereas the source account is specified in the link object.`

`Here, viewAccountLink({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{AccountIdentifiers}/links/{linkReference}`

> `This endpoint returns a specific link for a given account where a single identifier is not sufficient to identify an account. Note that to identify the accounts that are to be linked, the target account is specified in the path whereas the source account is specified in the link object.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountLink = async (linkref, debug = false) => {
    try {
        /**
         * Construct a request object and set desired parameters
         */
        const request = new mmapi.accountLinking.viewAccountLink({ "accountid": "2000" }, linkref);

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
viewAccountLink('<<REPLACE-WITH-LINK-REF>>', true);
```

### Example Output

```javascript
200

{
    "linkReference": "REF-1638376731631",
    "sourceAccountIdentifiers": [
        {
            "key": "accountid",
            "value": "2999"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637907197912"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637907232832"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637907265888"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637907412029"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637907483978"
        },
        {
            "key": "mandatereference",
            "value": "REF-1637909732171"
        },
        {
            "key": "mandatereference",
            "value": "REF-1638330257762"
        },
        {
            "key": "mandatereference",
            "value": "REF-1638360515423"
        }
    ],
    "mode": "both",
    "status": "active",
    "requestingOrganisation": {
        "requestingOrganisationIdentifierType": "organisationid",
        "requestingOrganisationIdentifier": "12345"
    },
    "creationDate": "2021-12-01T16:38:52",
    "modificationDate": "2021-12-01T16:38:52",
    "customData": [
        {
            "key": "keytest",
            "value": "keyvalue"
        }
    ]
}
```
# View An Authorisation Code

`Here, viewAuthorisationCode({ identifierType1: identifier1 }, authorisationCode) creates a GET request to /accounts/{identifierType}/{identifier}/authorisationcodes/{authorisationCode}`

> `This endpoint returns a specific Authorisation Code linked to an account.`

`Here, viewAuthorisationCode({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }, authorisationCode) creates a GET request to /accounts/{RequestorAccountIdentifiers}/authorisationcodes/{authorisationCode}`

> `This endpoint returns a specific Authorisation Code linked to an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAuthorisationCode = async (authorisationCode, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.merchantPayment.viewAuthorisationCode({ "walletid": "1" }, authorisationCode);

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
viewAuthorisationCode('<<REPLACE-WITH-AUTHORIZATION-CODE>>', true);
```

### Example Output

```javascript
200

{
  "authorisationCode": "ad922511-77ae-4c17-b674-f85a96fffbf7",
  "codeState": "active",
  "amount": "1000.00",
  "currency": "GBP",
  "redemptionAccountIdentifiers": [
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
  "creationDate": "2021-11-16T15:42:05",
  "modificationDate": "2021-11-16T15:42:05",
  "requestDate": "2018-07-03T10:43:27"
}
```



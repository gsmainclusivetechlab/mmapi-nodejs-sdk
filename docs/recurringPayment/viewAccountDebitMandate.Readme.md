# View A Debit Mandate

`Here, viewAccountDebitMandate({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}/debitmandates/{debitMandateReference}`

> `This endpoint returns a specific debit mandate linked to an account where one identifier suffices to uniquely identify an account. Note that the payer account is identified in the path.`

`Here, viewAccountDebitMandate({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{AccountIdentifiers}/debitmandates/{debitMandateReference}`

> `This endpoint returns a specific debit mandate linked to an account where a single identifier is not sufficient to identify an account. Note that the payer account is identified in the path.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountDebitMandate = async (mandateReference, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.viewAccountDebitMandate({ "accountid": "2000" }, mandateReference);

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
viewAccountDebitMandate('<<REPLACE-WITH-MANDATE-REFERENCE>>', true);
```

### Example Output

```javascript
202

{
    "currency": "GBP",
    "amountLimit": "1000.00",
    "startDate": "2018-07-03",
    "endDate": "2028-07-03",
    "numberOfPayments": 2,
    "frequencyType": "sixmonths",
    "mandateStatus": "active",
    "requestDate": "2018-07-03T10:43:27",
    "mandateReference": "REF-1637662586029",
    "creationDate": "2021-11-23T10:16:26",
    "modificationDate": "2021-11-23T10:16:26",
    "payee": [
        {
            "key": "accountid",
            "value": "2999"
        }
    ],
    "customData": [
        {
            "key": "keytest",
            "value": "keyvalue"
        }
    ]
}
```
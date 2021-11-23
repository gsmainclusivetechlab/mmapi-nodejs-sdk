# View A Debit Mandate

`Here, viewAccountDebitMandate(identifierType, identifier, debitMandateReference) creates a GET request to /accounts/{identifierType}/{identifier}/debitmandates/{debitMandateReference}`

> `This endpoint returns a specific debit mandate linked to an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountDebitMandate = async (identifierType, identifier, debitMandateReference) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.viewAccountDebitMandate(identifierType, identifier, debitMandateReference);

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
viewAccountDebitMandate('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>', '<<REPLACE-WITH-DEBIT-MANDATE-REFERENCE>>');
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
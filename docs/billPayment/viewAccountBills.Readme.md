# View Account Bills

`Here, viewAccountBills({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}/bills`

> `This endpoint returns bills linked to an account where one identifier suffices to uniquely identify an account.`

`Here, viewAccountBills({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{identifierType}/{identifier}/bills`

> `This endpoint returns bills linked to an account where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountBills = async (accountIdentifiers, query) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.billPayment.viewAccountBills(accountIdentifiers);

    /**
     * Set the query parameters
     */
    request.offset(query.offset);
    request.limit(query.limit);
    request.fromDateTime(query.fromDateTime);
    request.toDateTime(query.fromDateTime);

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
viewAccountBills('<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>', '<<REPLACE-WITH-QUERY-PARAMETERS>>');
```

### Example Output

```javascript
200

[
    {
        "billReference": "REF-000002",
        "amountDue": "60.00",
        "currency": "GBP",
        "dueDate": "2016-09-30",
        "minimumAmountDue": "0.00",
        "creationDate": "2021-02-17T00:00:00",
        "modificationDate": "2021-02-17T00:00:00"
    }
]
```



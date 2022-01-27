# View A Transaction

`Here, viewTransaction(transactionReference) creates a GET request to /transactions/{transactionReference}`

> `This endpoint returns the details of a transaction`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewTransaction = async (transactionReference, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewTransaction(transactionReference);

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
viewTransaction('<<REPLACE-WITH-TRANSACTION-REFERENCE>>', true);
```

### Example Output

```javascript
200

{
  "transactionReference": "REF-1635490512846",
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "type": "merchantpay",
  "transactionStatus": "pending",
  "amount": "200.00",
  "currency": "RWF",
  "creationDate": "2021-10-29T07:55:13",
  "modificationDate": "2021-10-29T07:55:13",
  "requestDate": "2021-10-29T07:55:13"
}
```

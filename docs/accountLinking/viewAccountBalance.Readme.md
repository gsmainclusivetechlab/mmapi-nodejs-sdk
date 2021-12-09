# View Account Balance

`Here, viewAccountBalance(identifierType, identifier) creates a GET request to /accounts/{identifierType}/{identifier}/balance`

> `This endpoint returns the balance of an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountBalance = async (identifierType, identifier) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.accountLinking.viewAccountBalance(identifierType, identifier);

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    console.log("Response Headers: ", response.headers);

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
viewAccountBalance('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>');
```

### Example Output

```javascript
200

{
  "currentBalance": "0.00",
  "availableBalance": "0.00",
  "reservedBalance": "0.00",
  "unclearedBalance": "0.00",
  "accountStatus": "available"
}
```

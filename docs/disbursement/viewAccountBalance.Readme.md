# View Account Balance

1) `Here, viewAccountBalance({ identifierType: identifier }) creates a GET request to /accounts/{identifierType}/{identifier}/balance`

> `This endpoint returns the balance of an account where one identifier suffices to uniquely identify an account.`

2) `Here, viewAccountBalance({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to /accounts/{AccountIdentifiers}/balance`

> `This endpoint returns the balance of an account where a single identifier is not sufficient to identify an account.`

3) `Here, viewAccountBalance() creates a GET request to /accounts/balance`

> `This endpoint returns the balance of an account. As the account is not passed as a parameter, the account is assumed to be that of the calling client.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountBalance = async (accountIdentifiers) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewAccountBalance(accountIdentifiers);

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", JSON.stringify(response.data, null, 4));

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
viewAccountBalance('<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>');
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

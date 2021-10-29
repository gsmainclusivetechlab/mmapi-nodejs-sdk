# Get An Account Balance

### Code To Execute

```javascript
const getAnAccountBalance  = async (identifierType, identifier) => {
  try{
    // Construct a request object and set desired parameters
    // Here, GetAnAccountBalanceRequest(identifierType, identifier) creates a GET request to /accounts/{identifierType}/{identifier}/balance
    let request = new mmapi.common.GetAnAccountBalanceRequest(identifierType, identifier);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
getAnAccountBalance('accountid', 2000)
```

### Expected Output

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
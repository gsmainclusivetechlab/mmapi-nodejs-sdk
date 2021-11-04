# Retrieve A Transaction

### Usage/Examples

```javascript
const retrieveATransaction = async (transactionReference) => {
  try{
    // Construct a request object and set desired parameters
    // Here, RetrieveATransactionRequest(transactionReference) creates a GET request to /transactions/{transactionReference}
    let request = new mmapi.common.RetrieveATransactionRequest(transactionReference);

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Header: ${response.headers}`);
    console.log(`Response Data: ${response.data}`);

    return response;
  } catch (e) {
    console.log(e)
  }
}
retrieveATransaction('REPLACE-WITH-TRANSACTION-REFERENCE')
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

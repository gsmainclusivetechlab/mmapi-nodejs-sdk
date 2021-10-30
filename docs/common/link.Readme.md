# Link

### Usage/Examples

```javascript
const link  = async (link) => {
  try{
    // Construct a request object and set desired parameters
    // Here, LinkRequest(link) creates a GET request to /{link}
    let request = new mmapi.common.LinkRequest(link);

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
link('REPLACE-WITH-LINK')
```

### Example Output

```javascript
  200

  {
    "transactionReference": "REF-1635442955061",
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
    "creationDate": "2021-10-28T18:42:35",
    "modificationDate": "2021-10-28T18:42:35",
    "requestDate": "2021-10-28T18:42:35"
  }
```

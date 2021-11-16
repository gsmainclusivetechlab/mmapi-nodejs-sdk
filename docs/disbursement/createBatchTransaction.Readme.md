# Create A Transaction Batch Request

`Here, createBatchTransaction() creates a POST request to /batchtransactions`

> `Provided with a valid object representation, this endpoint allows for a new transaction batch to be created`

### Usage/Examples
```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  "transactions": [
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ]
    },
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ]
    }
  ],
  "batchTitle": "Batch_Test",
  "batchDescription": "Testing a Batch",
  "scheduledStartDate": "2019-12-11T15:08:03.158Z"
});

/**
 * Set up your function to be invoked
 */
const createBatchTransaction = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createBatchTransaction();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

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
createBatchTransaction();
```

### Example Output
```javascript
202

{
  "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75",
  "status": "pending",
  "notificationMethod": "callback",
  "objectReference": "429",
  "pollLimit": 100
}
```

# mmapi-nodejs-sdk


## Perform a Bulk Disbursement

### Request

`POST /batchtransactions`

     | First Header  | Second Header | Second Header |
     | ------------- | ------------- | ------------- |
     | X-Callback-URL | Required | String containing the URL which should receive the Callback. For asynchronous requests.  |
     | data  | Required | |

```
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

const buildXCallbackURL = () => '<<PLACE YOUR CALLBACK URL HERE>>';

let performAMerchantPayment  = async function() {
    const request = new mmapi.disbursement.PerformABulkDisbursementRequest();
    request.data = buildRequestBody();
    request.headers['X-Callback-URL'] = buildXCallbackURL();


    const response = await client.execute(request);
    console.log(`Response Data: ${response.status}`);
    console.log(`Response Data: ${response.data}`);

    return response;
}
performAMerchantPayment();
```

### Response

  202

  {
    "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "429",
    "pollLimit": 100
  }
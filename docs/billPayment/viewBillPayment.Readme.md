# View Payments for a Bill

`Here, viewBillPayment({ identifierType1: identifier1 }, billReference) creates a GET request to /accounts/{identifierType}/{identifier}/bills/{billReference}/payments`

> `This endpoint allows for bill payments for a specific account to be returned where one identifier suffices to uniquely identify an account.`

`Here, viewBillPayment({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }, billReference) creates a GET request to /accounts/{AccountIdentifiers}/bills/{billReference}/payments`

> `This endpoint allows for bill payments for a specific account to be returned where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewBillPayment = async (debug = false) => {
    try {
        /**
         * Construct a request object and set desired parameters
         */
        const request = new mmapi.billPayment.viewBillPayment({ "accountid": "1" }, "REF-000001");

        /**
          * Set the limit parameter
          */
        request.limit(5);

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
            console.log("Response X-Records-Available-Count", response.headers['x-records-available-count']);
            console.log("Response X-Records-Returned-Count", response.headers['x-records-returned-count']);
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
viewBillPayment(true);
```

### Example Output

```javascript
200

[
        {
            "customerReference": "customer ref 0001",
            "billPaymentStatus": "unpaid",
            "amountPaid": "0.99",
            "currency": "GBP",
            "supplementaryBillReferenceDetails": [
                {
                    "paymentReferenceType": "type 1",
                    "paymentReferenceValue": "value 1"
                }
            ],
            "requestDate": "2021-02-18T08:21:27",
            "creationDate": "2021-02-17T00:00:00",
            "modificationDate": "2021-02-18T08:20:58"
        },
        {
            "customerReference": "customer ref 0001",
            "billPaymentStatus": "unpaid",
            "amountPaid": "0.99",
            "currency": "GBP",
            "supplementaryBillReferenceDetails": [
                {
                    "paymentReferenceType": "type 1",
                    "paymentReferenceValue": "value 1"
                }
            ],
            "requestDate": "2021-02-18T08:21:27",
            "creationDate": "2021-02-17T00:00:00",
            "modificationDate": "2021-02-18T08:20:58"
        },
        {
            "billPaymentStatus": "unpaid",
            "amountPaid": "55.00",
            "currency": "AED",
            "requestDate": "2021-02-18T08:21:27",
            "creationDate": "2021-02-17T00:00:00",
            "modificationDate": "2021-02-18T08:20:58"
        },
        {
            "billPaymentStatus": "unpaid",
            "amountPaid": "55.00",
            "currency": "AED",
            "requestDate": "2021-02-18T08:21:27",
            "creationDate": "2021-02-17T00:00:00",
            "modificationDate": "2021-02-18T08:20:58"
        },
        {
            "billPaymentStatus": "unpaid",
            "amountPaid": "55.00",
            "currency": "AED",
            "requestDate": "2021-02-18T08:21:27",
            "creationDate": "2021-02-17T00:00:00",
            "modificationDate": "2021-02-18T08:20:58"
        }
]
```

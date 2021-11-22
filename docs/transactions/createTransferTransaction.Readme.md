
# Create A Transfer Transaction

`Here, createTransferTransaction() creates a POST request to /transactions/type/transfer`

> `Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type 'transfer' passed via the URL.`

### Usage/Examples

```javascript
/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
    "amount": "100.00",
    "creditParty": [
        {
            "key": "accountid",
            "value": "2000"
        }
    ],
    "currency": "GBP",
    "debitParty": [
        {
            "key": "accountid",
            "value": "2999"
        }
    ],
    "internationalTransferInformation": {
        "originCountry": "AD",
        "quotationReference": "{{quotationReference}}",
        "quoteId": "{{quoteId}}",
        "remittancePurpose": "personal",
        "deliveryMethod": "agent"
   },
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
});

/**
 * Set up your function to be invoked
 */
const createTransferTransaction = async () => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.transactions.createTransferTransaction();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

    /**
     * Chose the polling method.
     */
    request.polling();

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
createTransferTransaction();
```

### Example Output - Callback
```javascript
202

{
    "serverCorrelationId": "85025241-57e6-49b7-b9b4-84c45974a75f",
    "status": "pending",
    "notificationMethod": "callback",
    "objectReference": "14452",
    "pollLimit": 100
}
```

### Example Output - Polling
```javascript
202

{
  "serverCorrelationId": "b501aeeb-c3b8-45d8-9fc7-375fb42ea87e",
  "status": "pending",
  "notificationMethod": "polling",
  "objectReference": "14457",
  "pollLimit": 100
}
```
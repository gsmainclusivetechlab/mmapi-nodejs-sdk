# View A Link

`Here, viewAccountLink(identifierType, identifier, linkReference) creates a GET request to /accounts/{identifierType}/{identifier}/links/{linkReference}`

> `This endpoint returns a specific link for a given account.`

### Usage/Examples
```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountLink = async (identifierType, identifier, linkReference) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.'<<REPLACE-WITH-USE-CASE>>'.viewAccountLink(identifierType, identifier, linkReference);

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
viewAccountLink('<<REPLACE-WITH-IDENTIFIER-TYPE>>', '<<REPLACE-WITH-IDENTIFIER>>', '<<REPLACE-WITH-LINK-REFERENCE>>');
```

### Example Output
```javascript
200


```
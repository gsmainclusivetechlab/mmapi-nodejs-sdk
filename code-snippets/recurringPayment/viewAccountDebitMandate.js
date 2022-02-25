/**
 * Set up your function to be invoked
 */
const viewAccountDebitMandate = async (mandateReference, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.viewAccountDebitMandate({ "walletid": "1" }, mandateReference);

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
viewAccountDebitMandate('<<REPLACE-WITH-MANDATE-REFERENCE>>', true);
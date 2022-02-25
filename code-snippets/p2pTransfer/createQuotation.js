/**
 * Set up your function to be invoked
 */
const createQuotation = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.p2pTransfer.createQuotation();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.creditParty([{ "key": "msisdn", "value": "+44012345678" }]);
    request.debitParty([{ "key": "walletid", "value": "1" }]);
    request.type("transfer");
    request.subType("abc");
    request.requestAmount("75.30");
    request.requestCurrency("RWF");
    request.chosenDeliveryMethod("directtoaccount");
    request.requestDate("2018-07-03T11:43:27.405Z");
    request.customData([{ "key": "keytest", "value": "keyvalue" }]);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(callbackUrl);
    }

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
createQuotation(false, true);
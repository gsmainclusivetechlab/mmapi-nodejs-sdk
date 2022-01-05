'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
require('../test_helper');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../test_harness').client();
const callbackUrl = require('../test_harness').callbackUrl;

/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  "payee": [
    {
      "key": "msisdn",
      "value": "+44012345678"
    }
  ],
  "requestDate": "2018-07-03T10:43:27.405Z",
  "startDate": "2018-07-03T10:43:27.405Z",
  "currency": "GBP",
  "amountLimit": "1000.00",
  "endDate": "2028-07-03T10:43:27.405Z",
  "numberOfPayments": "2",
  "frequencyType": "sixmonths",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ]
})

/**
 * Create the request path parameter
 */
const buildAccountIdentifiers = () => ({
  "walletid": '1'
})

/**
 * Set up your function to be invoked
 */
const createAccountDebitMandate = async (useCase, body = buildRequestBody(), accountIdentifiers = buildAccountIdentifiers(), callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createAccountDebitMandate(accountIdentifiers);

    /**
     * Set the request body parameter
     */
    for (const property in body) {
      request[property](body[property]);
    }

    /**
     * Chose the callback method. Default is the polling method.
     */
    if (callback) {
      request.callback(callbackUrl);
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
 * This module was run directly from the command line as in node xxx.js
 */
if (require.main === module) {
  /**
   * This is an immediately invoked function
   */
  (async () => {
    try {
      await createAccountDebitMandate('<<REPLACE-WITH-USE-CASE>>', undefined, undefined, undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createAccountDebitMandate
};


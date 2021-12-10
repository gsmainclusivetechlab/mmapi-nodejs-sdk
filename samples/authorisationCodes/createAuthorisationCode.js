'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
require('../test_helper');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../test_harness').client();

/**
 * Create the request body parameter
 */
const createAuthorisationCodeRequestBody = {
  merchantPayment: () => ({
    "requestDate": "2018-07-03T10:43:27.405Z",
    "currency": "GBP",
    "amount": "1000.00"
  })
}

/**
 * Create the request path parameter
 */
const createAuthorisationCodeRequestPath = {
  'msisdn': '+44012345678'
}

/**
 * Set up your function to be invoked
 */
const createAuthorisationCode = async (body, accountIdentifiers, useCase, polling = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createAuthorisationCode(accountIdentifiers);

    /**
     * Set the request body parameter
     */
    for (const property in body) {
      request[property](body[property]);
    }

    /**
     * Chose the polling method.
     */
    if (polling) {
      request.polling();
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
      await createAuthorisationCode('<<REPLACE-WITH-BODY>>', '<<REPLACE-WITH-ACCOUNT-IDENTIFIERS>>', '<<REPLACE-WITH-USE-CASE>>', '<<REPLACE-WITH-POLLING-TRUE-OR-FALSE>>', true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createAuthorisationCode,
  createAuthorisationCodeRequestBody,
  createAuthorisationCodeRequestPath
};


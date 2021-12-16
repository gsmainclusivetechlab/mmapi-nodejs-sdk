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
 * Create the request path parameter
 */
const buildAccountIdentifiers = () => ({
  'msisdn': '+44012345678'
})

/**
 * Set up your function to be invoked
 */
const viewAuthorisationCode = async (authorisationCode, useCase, accountIdentifiers = buildAccountIdentifiers(), debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].viewAuthorisationCode(accountIdentifiers, authorisationCode);

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
      await viewAuthorisationCode('<<REPLACE-WITH-AUTHORISATION-CODE>>', '<<REPLACE-WITH-USE-CASE>>', undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  viewAuthorisationCode
};




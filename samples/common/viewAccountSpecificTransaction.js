'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

/**
 * Set up your function to be invoked
 */
const viewAccountSpecificTransaction = async (identifierType, identifier) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.common.ViewAccountSpecificTransactionRequest(identifierType, identifier);

    /**
     * Set the offset parameter
     */
    request.offset(0);

    /**
     * Set the limit parameter
     */
    request.limit(20);

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
      const response = await viewAccountSpecificTransaction('REPLACE-WITH-IDENTIFIER-TYPE', 'REPLACE-WITH-IDENTIFIER');
      console.log("Response Status: ", response.status);
      console.log("Response Data: ", JSON.stringify(response.data, null, 4));
      console.log("Response Headers: ", response.headers);
    } catch (err) {
      /**
       * Handle any errors from the call
       */
      console.log(err);
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  viewAccountSpecificTransaction
};




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
 * Set up the request path parameters
 */
const buildAccountIdentifiers = () => ({
  'accountid': '1'
})

/**
 * Create the billReference request path parameter
 */
const buildBillReference = () => 'REF-000001';

/**
 * Set up the request query parameters
 */
const buildRequestQuery = () => ({
  limit: 5
})

/**
 * Set up your function to be invoked
 */
const viewBillPayment = async (useCase, accountIdentifiers = buildAccountIdentifiers(), billReference = buildBillReference(), query = buildRequestQuery(), debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].viewBillPayment(accountIdentifiers, billReference);

    /**
     * Set the request query parameter
     */
    for (const property in query) {
      request[property](query[property]);
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
 * This module was run directly from the command line as in node xxx.js
 */
if (require.main === module) {
  /**
   * This is an immediately invoked function
   */
  (async () => {
    try {
      await viewBillPayment('<<REPLACE-WITH-USE-CASE>>', undefined, undefined, undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  viewBillPayment
};




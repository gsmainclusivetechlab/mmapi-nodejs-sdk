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
 * Set up the request query parameters
 */
const buildRequestQuery = () => ({
  // limit: 0,
  // offset: 20
})

/**
 * Set up your function to be invoked
 */
const viewBatchCompletions = async (useCase, batchId, query = buildRequestQuery(), debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].viewBatchCompletions(batchId);

    /**
     * Set the offset query parameter
     */
    request.offset(query.offset);

    /**
     * Set the limit query parameter
     */
    request.limit(query.limit);

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
      await viewBatchCompletions('<<REPLACE-WITH-USE-CASE>>', '<<REPLACE-WITH-BATCH-ID>>', undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  viewBatchCompletions
};





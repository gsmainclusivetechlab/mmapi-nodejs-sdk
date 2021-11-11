'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../../test/test_harness').client();

/**
 * Create the request body parameter
 */
const buildRequestBody = () => ([
  {
    "op": "replace",
    "path": "/batchStatus",
    "value": "completed"
  }
]);

/**
 * Set up your function to be invoked
 */
const updateATransactionBatch = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.UpdateATransactionBatchRequest(batchId);

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

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
    console.log(err);

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
      await updateATransactionBatch('REPLACE-WITH-BATCH-ID', true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  updateATransactionBatch
};



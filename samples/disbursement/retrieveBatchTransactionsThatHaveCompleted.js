'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

/**
 * This function can be used to perform an individual disbursement
 */
let retrieveBatchTransactionsThatHaveCompleted = async function (batchId) {
  try {
    // Construct a request object and set desired parameters
    // Here, retrieveBatchTransactionsThatHaveCompletedRequest(batchId) creates a GET request to /batchtransactions/{batchId}/completions
    const request = new mmapi.disbursement.RetrieveBatchTransactionsThatHaveCompletedRequest(batchId);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the retrieveBatchTransactionsThatHaveCompleted function
 * to retrieve an order details.
*/
if (require.main === module) {
 (async () => {
   await retrieveBatchTransactionsThatHaveCompleted('REF-1635509903380');
 })();
}

/**
 * Exports the retrieveBatchTransactionsThatHaveCompleted function. If needed this can be invoked from the other modules
 */
module.exports = { retrieveBatchTransactionsThatHaveCompleted: retrieveBatchTransactionsThatHaveCompleted };


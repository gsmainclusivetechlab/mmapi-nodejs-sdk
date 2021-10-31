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
let retrieveBatchTransactionsThatHaveBeenRejected = async (batchId) => {
  try {
    // Construct a request object and set desired parameters
    // Here, RetrieveBatchTransactionsThatHaveBeenRejectedRequest(batchId) creates a GET request to /batchtransactions/{batchId}/rejections
    const request = new mmapi.disbursement.RetrieveBatchTransactionsThatHaveBeenRejectedRequest(batchId);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the RetrieveBatchTransactionsThatHaveBeenRejectedRequest function
 * to retrieve an order details.
*/
if (require.main === module) {
 (async () => {
   await retrieveBatchTransactionsThatHaveBeenRejected('REF-1635509903380');
 })();
}

/**
 * Exports the retrieveBatchTransactionsThatHaveBeenRejected function. If needed this can be invoked from the other modules
 */
module.exports = { retrieveBatchTransactionsThatHaveBeenRejected: retrieveBatchTransactionsThatHaveBeenRejected };


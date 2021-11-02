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
let viewATransactionBatch = async function (batchId) {
  try {
    // Construct a request object and set desired parameters
    // Here, ViewATransactionBatchRequest(batchId) creates a GET request to /batchtransactions/{batchId}
    const request = new mmapi.disbursement.ViewATransactionBatchRequest(batchId);

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
    await viewATransactionBatch('REF-1635846330263');
  })();
}

/**
 * Exports the viewATransactionBatch function. If needed this can be invoked from the other modules
 */
module.exports = { viewATransactionBatch: viewATransactionBatch };


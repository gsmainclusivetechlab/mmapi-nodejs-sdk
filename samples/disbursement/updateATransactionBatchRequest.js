'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

const buildRequestBody = () => ([
  {
    "op": "replace",
    "path": "/batchStatus",
    "value": "approved"
  }
]);

/**
 * This function can be used to perform an update A transaction batch
 */
let updateATransactionBatch = async function (batchId) {
  try {
    // Construct a request object and set desired parameters
    // Here, UpdateATransactionBatchRequest(batchId) creates a PATCH request to /batchtransactions/{batchId}
    const request = new mmapi.disbursement.UpdateATransactionBatchRequest(batchId);
    request.data = buildRequestBody();
    console.log('request', request)

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the updateATransactionBatch function
 * to retrieve an order details.
*/
if (require.main === module) {
  (async () => {
    await updateATransactionBatch('REF-1635854756342');
  })();
}

/**
 * Exports the updateATransactionBatch function. If needed this can be invoked from the other modules
 */
module.exports = { updateATransactionBatch: updateATransactionBatch };


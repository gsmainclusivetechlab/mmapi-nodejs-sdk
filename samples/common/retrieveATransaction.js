'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

const { performAMerchantPayment } = require('../merchantPayment/performAMerchantPayment');
const { pollToDetermineTheRequestState } = require('./pollToDetermineTheRequestState');

/**
 * This function can be used to check service availability.
 */
let retrieveATransaction = async function (transactionReference) {
  try {
    const request = new mmapi.common.RetrieveATransactionRequest(transactionReference);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Respoanse Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the immediately invoked function which invokes the retrieveATransaction function.
*/
if (require.main === module) {
  (async () => {
    const { data: { serverCorrelationId } } = await performAMerchantPayment();
    const { data: { objectReference } } = await pollToDetermineTheRequestState(serverCorrelationId);
    await retrieveATransaction(objectReference);
  })();
}

/**
 * Exports the retrieveATransaction function. If needed this can be invoked from the other modules.
 */
module.exports = { retrieveATransaction: retrieveATransaction };


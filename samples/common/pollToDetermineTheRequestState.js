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

/**
 * This function can be used to check service availability.
 */
let pollToDetermineTheRequestState = async function (serverCorrelationId) {
  try {
    const request = new mmapi.common.PollToDetermineTheRequestStateRequest(serverCorrelationId);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Respoanse Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the immediately invoked function which invokes the pollToDetermineTheRequestState function.
*/
if (require.main === module) {
  (async () => {
    const { data: { serverCorrelationId } } = await performAMerchantPayment();
    await pollToDetermineTheRequestState(serverCorrelationId);
  })();
}

/**
 * Exports the pollToDetermineTheRequestState function. If needed this can be invoked from the other modules.
 */
module.exports = { pollToDetermineTheRequestState: pollToDetermineTheRequestState };


'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

const buildRequestBody = () => ({ "amount": "200.00", "debitParty": [{ "key": "accountid", "value": "2999" }], "creditParty": [{ "key": "accountid", "value": "2999" }], "currency": "RWF" });

const performAMerchantPayment = async () => {
  try {
    const request = new mmapi.merchantPayment.PerformAMerchantPaymentRequest();
    let clientCorrelationId = request.headers['X-CorrelationID'];
    request.data = buildRequestBody()

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return clientCorrelationId;
  } catch (e) {
    console.log(e)
  }
}

/**
 * This function can be used to retrieve A Missing Response
 */
let retrieveAMissingResponse = async function (clientCorrelationId) {
  try {
    const request = new mmapi.common.RetrieveAMissingResponseRequest(clientCorrelationId);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the immediately invoked function which invokes the retrieveAMissingResponse function.
*/
if (require.main === module) {
 (async () => {
   const clientCorrelationId = await performAMerchantPayment();
   return await retrieveAMissingResponse(clientCorrelationId);
 })();
}

/**
 * Exports the retrieveAMissingResponse function. If needed this can be invoked from the other modules.
 */
module.exports = { retrieveAMissingResponse: retrieveAMissingResponse };


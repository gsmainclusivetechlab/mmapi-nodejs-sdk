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
 * This function can be used to check service availability.
 */
let getLink = async function (link) {
  try {
    const request = new mmapi.common.LinkRequest(link);

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Respoanse Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

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
 * This is the immediately invoked function which invokes the link function.
*/
(async () => {
  const clientCorrelationId = await performAMerchantPayment();
  const { data: { link } } = await retrieveAMissingResponse(clientCorrelationId);
  await getLink(link);
})();

/**
 * Exports the link function. If needed this can be invoked from the other modules.
 */
module.exports = { link: getLink };


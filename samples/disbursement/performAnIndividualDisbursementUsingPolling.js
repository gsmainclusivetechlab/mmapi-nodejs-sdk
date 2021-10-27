'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

const buildRequestBody = () => ({
  amount: '200.00',
  creditParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
  currency: 'RWF',
  debitParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
});

/**
 * This function can be used to perform an individual disbursement
 */
let performAnIndividualDisbursementUsingPolling = async function () {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAnIndividualDisbursementUsingPollingRequest() creates a POST request to /transactions/type/disbursement
    const request = new mmapi.disbursement.PerformAnIndividualDisbursementUsingPollingRequest();
    request.data = buildRequestBody();

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the performAnIndividualDisbursementUsingPolling function
 * to retrieve an order details.
*/
(async () => {
  await performAnIndividualDisbursementUsingPolling();
})();

/**
 * Exports the performAnIndividualDisbursementUsingPolling function. If needed this can be invoked from the other modules
 */
module.exports = { performAnIndividualDisbursementUsingPolling: performAnIndividualDisbursementUsingPolling };


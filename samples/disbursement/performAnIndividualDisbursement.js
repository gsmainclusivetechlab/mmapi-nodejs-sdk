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

const buildXCallbackURL = () => 'https://322894a8-6c41-4b35-80cc-7fbfec49c4a2.mock.pstmn.io/pramisha';

/**
 * This function can be used to perform an individual disbursement
 */
let performAnIndividualDisbursement = async function () {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAnIndividualDisbursement() creates a POST request to /transactions/type/disbursement
    const request = new mmapi.disbursement.PerformAnIndividualDisbursementRequest();
    request.data = buildRequestBody();
    request.headers['X-Callback-URL'] = buildXCallbackURL();

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the performAnIndividualDisbursement function
 * to retrieve an order details.
*/
(async () => {
  await performAnIndividualDisbursement();
})();

/**
 * Exports the performAnIndividualDisbursement function. If needed this can be invoked from the other modules
 */
module.exports = { performAnIndividualDisbursement: performAnIndividualDisbursement };


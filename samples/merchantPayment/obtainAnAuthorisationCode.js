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
  requestDate: '2018-07-03T10:43:27.405Z',
  currency: 'GBP',
  amount: '1000.00',
});

/**
 * This function can be used to perform an obtain An Authorisation Code
 */
let obtainAnAuthorisationCode = async () => {
  try {
    // Construct a request object and set desired parameters
    // Here, ObtainAnAuthorisationCodeRequest(identifierType, identifier) creates a POST request to /accounts/{identifierType}/{identifier}/authorisationcodes
    const request = new mmapi.merchantPayment.ObtainAnAuthorisationCodeRequest('accountid', 2000);
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
 * This is the This is the immediately invoked function which invokes the obtainAnAuthorisationCode function.
*/
if (require.main === module) {
 (async () => {
   await obtainAnAuthorisationCode();
 })();
}

/**
 * Exports the obtainAnAuthorisationCode function. If needed this can be invoked from the other modules.
 */
module.exports = { obtainAnAuthorisationCode: obtainAnAuthorisationCode };


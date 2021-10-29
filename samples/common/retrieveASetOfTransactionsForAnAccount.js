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
let retrieveASetOfTransactionsForAnAccount = async function (identifierType, identifier) {
  try {
    const request = new mmapi.common.RetrieveASetOfTransactionsForAnAccountRequest(identifierType, identifier);
    request.queryParams(0, 20);

    const response = await client.execute(request);
    console.log("Response Status: ", response.status);
    console.log("Respoanse Data: ", JSON.stringify(response.data, null, 4));
    console.log("Response header: ", response.headers)

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the immediately invoked function which invokes the retrieveASetOfTransactionsForAnAccount function.
*/
(async () => {
  await retrieveASetOfTransactionsForAnAccount('accountid', 2000);
})();

/**
 * Exports the retrieveASetOfTransactionsForAnAccount function. If needed this can be invoked from the other modules.
 */
module.exports = { retrieveASetOfTransactionsForAnAccount: retrieveASetOfTransactionsForAnAccount };


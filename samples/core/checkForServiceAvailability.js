'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();
console.log('mmapi.core', mmapi.core)
/**
 * This function can be used to check service availability.
 */
let checkForServiceAvailabilityRequest = async function () {
  try {
    // Construct a request object and set desired parameters
    // Here, CheckForServiceAvailabilityRequest() creates a GET request to /heartbeat
    const request = new mmapi.core.CheckForServiceAvailabilityRequest();

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the checkForServiceAvailabilityRequest function
 * to retrieve an order details.
*/
(async () => {
  await checkForServiceAvailabilityRequest();
})();

/**
 * Exports the checkForServiceAvailabilityRequest function. If needed this can be invoked from the other modules
 */
module.exports = { checkForServiceAvailabilityRequest: checkForServiceAvailabilityRequest };


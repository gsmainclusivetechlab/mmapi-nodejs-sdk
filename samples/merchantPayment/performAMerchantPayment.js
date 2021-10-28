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
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "currency": "RWF"
});

/**
 * This function can be used to perform an individual disbursement
 */
let performAMerchantPayment = async () => {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformAMerchantPaymentRequest() creates a POST request to /transactions/type/merchantpay
    const request = new mmapi.merchantPayment.PerformAMerchantPaymentRequest();
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
 * This is the This is the immediately invoked function which invokes the performAMerchantPayment function.
*/
(async () => {
  await performAMerchantPayment();
})();

/**
 * Exports the performAMerchantPayment function. If needed this can be invoked from the other modules.
 */
module.exports = { performAMerchantPayment: performAMerchantPayment };


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
  "transactions": [
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ]
    },
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ]
    }
  ],
  "batchTitle": "Batch_Test",
  "batchDescription": "Testing a Batch",
  "scheduledStartDate": "2019-12-11T15:08:03.158Z"
});

/**
 * This function can be used to perform an individual disbursement
 */
let performABulkDisbursement = async function () {
  try {
    // Construct a request object and set desired parameters
    // Here, PerformABulkDisbursementRequest() creates a POST request to /batchtransactions
    const request = new mmapi.disbursement.PerformABulkDisbursementRequest();
    request.data = buildRequestBody();
    console.log('request', request)

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Response Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the driver function which invokes the performABulkDisbursement function
 * to retrieve an order details.
*/
if (require.main === module) {
  (async () => {
    await performABulkDisbursement();
  })();
}

/**
 * Exports the performABulkDisbursementRequest function. If needed this can be invoked from the other modules
 */
module.exports = { performABulkDisbursement: performABulkDisbursement };


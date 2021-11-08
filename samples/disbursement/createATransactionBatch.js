'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

/**
 * Create the request body parameter
 */
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
 * Set up your function to be invoked
 */
const createATransactionBatch = async (debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.CreateATransactionBatchRequest();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody();

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);
    if (debug) {
      console.log("Response Status: ", response.status);
      console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    }

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    console.log(err);

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * This module was run directly from the command line as in node xxx.js
 */
if (require.main === module) {
  /**
   * This is an immediately invoked function
   */
  (async () => {
    try {
      await createATransactionBatch(true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createATransactionBatch
};

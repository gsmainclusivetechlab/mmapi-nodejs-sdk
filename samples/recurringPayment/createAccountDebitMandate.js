'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
require('../test_helper');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../test_harness').client();

/**
 * Setting up the X-Callback-URL
 */
let callbackUrl = require('../test_harness').callbackUrl;

/**
 * Set up your function to be invoked
 */
const createAccountDebitMandate = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.createAccountDebitMandate({ "walletid": "1" });

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.payee([{ "key": "msisdn", "value": "+44012345678" }]);
    request.requestDate("2018-07-03T10:43:27.405Z");
    request.startDate("2018-07-03T10:43:27.405Z");
    request.currency("GBP");
    request.amountLimit("1000.00");
    request.endDate("2028-07-03T10:43:27.405Z");
    request.numberOfPayments("2");
    request.frequencyType("sixmonths");
    request.customData([{ "key": "keytest", "value": "keyvalue" }]);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(callbackUrl);
    }

    if (debug) {
      console.log("Request: ", JSON.stringify(request, null, 4));
    }

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
    if (debug) {
      console.log(err);
    }

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * Set up your function to be invoked
 */
const createAccountDebitMandateError = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.recurringPayment.createAccountDebitMandate({ "accountid": "123" });

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.payee([{ "key": "msisdn", "value": "+44012345678" }]);
    request.requestDate("2018-07-03T10:43:27.405Z");
    request.startDate("2018-07-03T10:43:27.405Z");
    request.currency("GBP");
    request.amountLimit("1000.00");
    request.endDate("2028-07-03T10:43:27.405Z");
    request.numberOfPayments("2");
    request.frequencyType("sixmonths");
    request.customData([{ "key": "keytest", "value": "keyvalue" }]);

    /**
     * Chose the callback method. Default is the polling method. You can also chose it by request.polling();
     */
    if (callback) {
      request.callback(callbackUrl);
    }

    if (debug) {
      console.log("Request: ", JSON.stringify(request, null, 4));
    }

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
    if (debug) {
      console.log(err);
    }

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
      await createAccountDebitMandate(false, true);
      await createAccountDebitMandateError(false, true);
    } catch (err) {
    }
  })();
}

/**
* Exports the function. If needed this can be invoked from the other modules.
*/
module.exports = {
  createAccountDebitMandate,
  createAccountDebitMandateError
};
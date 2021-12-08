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
 * Create the request body parameter
 */
const createTransferTransactionRequestBody = {
  p2pTransfer: (quotationReference) => ({
    "amount": "100.00",
    "creditParty": [
      {
        "key": "accountid",
        "value": "2000"
      }
    ],
    "currency": "GBP",
    "debitParty": [
      {
        "key": "accountid",
        "value": "2999"
      }
    ],
    "internationalTransferInformation": {
      "originCountry": "AD",
      "quotationReference": `${quotationReference}`,
      // "quoteId": "{{quoteId}}",
      "remittancePurpose": "personal",
      "deliveryMethod": "agent"
    },
    "requestingOrganisation": {
      "requestingOrganisationIdentifierType": "organisationid",
      "requestingOrganisationIdentifier": "testorganisation"
    }
  }),
  accountLinking: (linkReference) => ({
    "amount": "200.00",
    "creditParty": [
      {
        "key": "linkref",
        "value": `${linkReference}`
      }
    ],
    "currency": "RWF",
    "debitParty": [
      {
        "key": "accountid",
        "value": "2999"
      }
    ]
  })
}

/**
 * Set up your function to be invoked
 */
const createTransferTransaction = async (body, useCase, polling = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createTransferTransaction();

    /**
     * Set the request body parameter
     */
    for (const property in body) {
      request[property](body[property]);
    }

    /**
     * Chose the polling method.
     */
    if (polling) {
      request.polling();
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
      await createTransferTransaction('<<REPLACE-WITH-BODY>>', '<<REPLACE-WITH-USE-CASE>>', '<<REPLACE-WITH-POLLING-TRUE-OR-FALSE>>', true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createTransferTransaction,
  createTransferTransactionRequestBody
};
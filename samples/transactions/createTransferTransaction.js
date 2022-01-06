'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
require('../test_helper');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../test_harness').client();
const callbackUrl = require('../test_harness').callbackUrl;

/**
 * Create the request body parameter
 */
const buildRequestBody = () => ({
  accountLinking: ({ linkReference }) => ({
    "amount": "16.00",
    "creditParty": [
      {
        "key": "linkref",
        "value": `${linkReference}`
      }
    ],
    "currency": "USD",
    "debitParty": [
      {
        "key": "walletid",
        "value": "1"
      }
    ]
  }),
  p2pTransfer: ({ quotationReference, quoteId }) => {
    let body = {
      "amount": "16.00",
      "creditParty": [
        {
          "key": "msisdn",
          "value": "+44012345678"
        }
      ],
      "currency": "USD",
      "debitParty": [
        {
          "key": "walletid",
          "value": "1"
        }
      ],
      "requestingOrganisation": {
        "requestingOrganisationIdentifierType": "organisationid",
        "requestingOrganisationIdentifier": "testorganisation"
      }
    }

    if (quotationReference) {
      body.internationalTransferInformation = {
        "originCountry": "AD",
        "quotationReference": `${quotationReference}`,
        // "quoteId": `${quoteId}`,
        "remittancePurpose": "personal",
        "deliveryMethod": "agent"
      }
    }

    return body;
  }
})

/**
 * Set up your function to be invoked
 */
const createTransferTransaction = async (useCase, bodyProperties = {}, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createTransferTransaction();

    /**
     * Set the request body parameter
     */
    for (const property in buildRequestBody()[useCase](bodyProperties)) {
      request[property](buildRequestBody()[useCase](bodyProperties)[property]);
    }

    /**
     * Chose the callback method. Default is the polling method.
     */
    if (callback) {
      request.callback(callbackUrl);
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
      await createTransferTransaction('<<REPLACE-WITH-USE-CASE>>', undefined, undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createTransferTransaction
};
'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../../test/test_harness').client();

/**
 * Create the request body parameter
 */
const buildRequestBody = (quotationReference, quoteId) => ({
  "amount": "100.00",
  "creditParty": [
    {
      "key": "walletid",
      "value": "1"
    }
  ],
  "currency": "GBP",
  "debitParty": [
    {
      "key": "msisdn",
      "value": "+44012345678"
    }
  ],
  "internationalTransferInformation": {
    "originCountry": "GB",
    "quotationReference": `${quotationReference}`,
    // "quoteId": `${quoteId}`,
    "receivingCountry": "RW",
    "remittancePurpose": "personal",
    "relationshipSender": "none",
    "deliveryMethod": "agent",
    "sendingServiceProviderCountry": "AD"
  },
  "senderKyc": {
    "nationality": "GB",
    "dateOfBirth": "1970-07-03T11:43:27.405Z",
    "occupation": "Manager",
    "employerName": "MFX",
    "contactPhone": "+447125588999",
    "gender": "m",
    "emailAddress": "luke.skywalkeraaabbb@gmail.com",
    "birthCountry": "GB",
    "idDocument": [
      {
        "idType": "nationalidcard",
        "idNumber": "1234567",
        "issueDate": "2018-07-03T11:43:27.405Z",
        "expiryDate": "2021-07-03T11:43:27.405Z",
        "issuer": "UKPA",
        "issuerPlace": "GB",
        "issuerCountry": "GB",
        "otherIdDescription": "test"
      }
    ],
    "postalAddress": {
      "country": "GB",
      "addressLine1": "111 ABC Street",
      "city": "New York",
      "stateProvince": "New York",
      "postalCode": "ABCD"
    },
    "subjectName": {
      "title": "Mr",
      "firstName": "Luke",
      "middleName": "R",
      "lastName": "Skywalker",
      "fullName": "Luke R Skywalker",
      "nativeName": "ABC"
    }
  },
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
});

/**
 * Set up your function to be invoked
 */
const createAIntTransferTransaction = async (quotationReference, quoteId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.CreateAIntTransferTransactionRequest();

    /**
     * Set the request body parameter
     */
    request.data = buildRequestBody(quotationReference, quoteId);

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
      await createAIntTransferTransaction('<REPLACE-WITH-QUOTATION-REFERENCE>', '<REPLACE-WITH-QUOTE-ID>', true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createAIntTransferTransaction
};


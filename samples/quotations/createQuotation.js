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
  internationalTransfer: () => ({
    "creditParty": [
      {
        "key": "msisdn",
        "value": "+44012345678"
      }
    ],
    "debitParty": [
      {
        "key": "walletid",
        "value": "1"
      }
    ],
    "requestAmount": "16.00",
    "requestCurrency": "USD",
    "requestDate": "2018-07-03T11:43:27.405Z",
    "type": "inttransfer",
    "subType": "abc",
    "chosenDeliveryMethod": "agent",
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
    "customData": [
      {
        "key": "keytest",
        "value": "keyvalue"
      }
    ],
    "sendingServiceProviderCountry": "AD",
    "originCountry": "AD",
    "receivingCountry": "AD"
  }),
  p2pTransfer: () => ({
    "creditParty": [
      {
        "key": "msisdn",
        "value": "+44012345678"
      }
    ],
    "debitParty": [
      {
        "key": "walletid",
        "value": "1"
      }
    ],
    "requestAmount": "16.00",
    "requestCurrency": "USD",
    "requestDate": "2018-07-03T11:43:27.405Z",
    "type": "transfer",
    "subType": "abc",
    "chosenDeliveryMethod": "directtoaccount",
    "customData": [
      {
        "key": "keytest",
        "value": "keyvalue"
      }
    ]
  })
})

/**
 * Set up your function to be invoked
 */
const createQuotation = async (useCase, body = buildRequestBody(), callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createQuotation();

    /**
     * Set the request body parameter
     */
    for (const property in body[useCase]()) {
      request[property](body[useCase]()[property]);
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
      await createQuotation('<<REPLACE-WITH-USE-CASE>>', undefined, undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createQuotation
};


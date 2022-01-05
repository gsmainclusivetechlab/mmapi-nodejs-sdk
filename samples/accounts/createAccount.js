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
  agentService: ({ msisdn }) => {
    let body = {
      "accountIdentifiers": [
        {
          "key": `msisdn`,
          "value": `${msisdn}`
        }
      ],
      "identity": [
        {
          "identityKyc": {
            "birthCountry": "AD",
            "contactPhone": "+447777777777",
            "dateOfBirth": "2000-11-20",
            "emailAddress": "xyz@xyz.com",
            "employerName": "string",
            "gender": "m",
            "idDocument": [
              {
                "idType": "passport",
                "idNumber": "111111",
                "issueDate": "2018-11-20",
                "expiryDate": "2018-11-20",
                "issuer": "ABC",
                "issuerPlace": "DEF",
                "issuerCountry": "AD"
              }
            ],
            "nationality": "AD",
            "occupation": "Miner",
            "postalAddress": {
              "addressLine1": "37",
              "addressLine2": "ABC Drive",
              "addressLine3": "string",
              "city": "Berlin",
              "stateProvince": "string",
              "postalCode": "AF1234",
              "country": "AD"
            },
            "subjectName": {
              "title": "Mr",
              "firstName": "H",
              "middleName": "I",
              "lastName": "J",
              "fullName": "H I J",
              "nativeName": "string"
            }
          },
          "accountRelationship": "accountholder",
          "kycVerificationStatus": "verified",
          "kycVerificationEntity": "ABC Agent",
          "kycLevel": 1,
          "customData": [
            {
              "key": "test",
              "value": "custom"
            }
          ]
        }
      ],
      "accountType": "string",
      "customData": [
        {
          "key": "test",
          "value": "custom1"
        }
      ],
      "fees": [
        {
          "feeType": "string",
          "feeAmount": "5.46",
          "feeCurrency": "AED"
        }
      ],
      "registeringEntity": "ABC Agent",
      "requestDate": "2021-02-17T15:41:45.194Z"
    }

    return body;
  }
})

/**
 * Set up your function to be invoked
 */
const createAccount = async (useCase, bodyProperties = {}, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi[useCase].createAccount();

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
      await createAccount('<<REPLACE-WITH-USE-CASE>>', undefined, undefined, true);
    } catch (err) {
    }
  })();
}

/**
 * Exports the function. If needed this can be invoked from the other modules.
 */
module.exports = {
  createAccount
};


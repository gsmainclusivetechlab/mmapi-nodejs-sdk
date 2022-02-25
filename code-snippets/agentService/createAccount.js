/**
 * Set up your function to be invoked
 */
const createAccount = async (msisdn, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.createAccount();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.accountIdentifiers([{ "key": "msisdn", "value": `${msisdn}` }]);
    request.identity([
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
    ]);
    request.accountType("string");
    request.customData([{ "key": "test", "value": "custom1" }]);
    request.fees([{ "feeType": "string", "feeAmount": "5.46", "feeCurrency": "AED" }]);
    request.registeringEntity("ABC Agent");
    request.requestDate("2021-02-17T15:41:45.194Z");

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
 * Invoke the function
 */
createAccount('<<REPLACE-WITH-MSISDN>>', false, true);
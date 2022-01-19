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

const createInternationalTransaction = async (quotationReference, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createInternationalTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.creditParty([{ "key": "msisdn", "value": "+44012345678" }]);
    request.debitParty([{ "key": "walletid", "value": "1" }]);
    request.amount("100.00");
    request.currency("GBP");
    request.internationalTransferInformation({
      "originCountry": "GB",
      "quotationReference": `${quotationReference}`,
      // "quoteId": "{{quoteId}}",
      "receivingCountry": "RW",
      "remittancePurpose": "personal",
      "relationshipSender": "none",
      "deliveryMethod": "agent",
      "sendingServiceProviderCountry": "AD"
    });
    request.senderKyc({
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
    });
    request.requestingOrganisation({
      "requestingOrganisationIdentifierType": "organisationid",
      "requestingOrganisationIdentifier": "testorganisation"
    });

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

const createQuotation = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createQuotation();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.creditParty([{ "key": "msisdn", "value": "+44012345678" }]);
    request.debitParty([{ "key": "walletid", "value": "1" }]);
    request.type("inttransfer");
    request.subType("abc");
    request.requestAmount("75.30");
    request.requestCurrency("RWF");
    request.chosenDeliveryMethod("agent");
    request.requestDate("2018-07-03T11:43:27.405Z");
    request.customData([{ "key": "keytest", "value": "keyvalue" }]);
    request.senderKyc({
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
    });
    request.sendingServiceProviderCountry("AD");
    request.originCountry("AD");
    request.receivingCountry("AD");

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

const createReversal = async (originalTransactionReference, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.createReversal(originalTransactionReference);

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.type("reversal");

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

const viewAccountBalance = async (debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewAccountBalance({ "walletid": "1" });

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

const viewAccountTransactions = async (debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewAccountTransactions({ "walletid": "1" });

    /**
     * Set the offset parameter
     */
    request.offset(0);

    /**
     * Set the limit parameter
     */
    request.limit(20);

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
      console.log("Response X-Records-Available-Count", response.headers['x-records-available-count']);
      console.log("Response X-Records-Returned-Count", response.headers['x-records-returned-count']);
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

const viewQuotation = async (quotationReference, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewQuotation(quotationReference);

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

const viewRequestState = async (serverCorrelationId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewRequestState(serverCorrelationId);

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

const viewResource = async (link, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewResource(link);

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

const viewResponse = async (clientCorrelationId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewResponse(clientCorrelationId);

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

const viewServiceAvailability = async (debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewServiceAvailability();

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

const viewTransaction = async (transactionReference, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.internationalTransfer.viewTransaction(transactionReference);

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

describe('International Transfers', () => {
  describe('Perform an International Transfer', () => {
    describe('POST Request a International Transfer Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation(true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    describe('POST Perform an International Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createInternationalTransaction('REF-1636533162268', true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform an Bilateral International Transfer', () => {
    describe('POST Request a International Transfer Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation(true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    describe('POST Perform an International Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createInternationalTransaction('REF-1636533162268', true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform an International Transfer Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an International Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createInternationalTransaction('REF-1636533162268', undefined, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewRequestState(serverCorrelationId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');
        expect(response.data).toHaveProperty('objectReference');

        objectReference = response.data.objectReference;
      });
    })

    describe('GET Retrieve a Transaction', () => {
      it('should return transactions object with status 200 for a given object reference', async () => {
        const response = await viewTransaction(objectReference, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('inttransfer');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Request a International Transfer Quotation Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Request a International Transfer Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation(undefined, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewRequestState(serverCorrelationId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');
        expect(response.data).toHaveProperty('objectReference');

        objectReference = response.data.objectReference;
      });
    })

    describe('GET View A Quotation', () => {
      it('should return the quotation object with status 200', async () => {
        const response = await viewQuotation(objectReference, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('quotationReference');
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('requestAmount');
        expect(response.data).toHaveProperty('requestCurrency');
      });
    })
  });

  describe('Perform a International Transfer Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an International Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createInternationalTransaction('REF-1636533162268', true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewRequestState(serverCorrelationId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
        expect(response.data).toHaveProperty('objectReference');

        objectReference = response.data.objectReference;
      });
    })

    describe('POST Perform a Transaction Reversal', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createReversal(objectReference, true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Obtain a Financial Service Provider Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance(false);

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for a Financial Service Provider', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions(false);

        expect(response.status).toBe(200);
        expect(response.data.length).toBe(20);
        expect(response.headers).toHaveProperty('x-records-available-count');
        expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Check for API Provider Service Availability', () => {
    describe('GET Check for Service Availability', () => {
      it('should return the heartbeat object with status 200 to indicate the status available, unavailable or degraded', async () => {
        const response = await viewServiceAvailability(false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    let clientCorrelationId;
    let link;

    describe('POST Perform an International Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createInternationalTransaction('REF-1636533162268', true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');

        clientCorrelationId = response.config.headers['X-CorrelationID']
      });
    })

    describe('GET Retrieve a Missing Response', () => {
      it('should return a response object with status 200 containing a link to the missing resource', async () => {
        const response = await viewResponse(clientCorrelationId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource(link, false);

        expect(response.status).toBe(200);
      });
    })
  });
})
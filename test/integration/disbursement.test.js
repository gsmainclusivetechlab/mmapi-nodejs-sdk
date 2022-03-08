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

const createBatchTransaction = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createBatchTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.transactions([
      {
        "amount": "16.00",
        "type": "transfer",
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
        ]
      },
      {
        "amount": "16.00",
        "type": "transfer",
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
        ]
      }
    ]);
    request.batchTitle("Batch_Test");
    request.batchDescription("Testing a Batch");
    request.scheduledStartDate("2019-12-11T15:08:03.158Z");

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

const createDisbursementTransaction = async (callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.createDisbursementTransaction();

    /**
     * Set the request body parameters individually or by request.body(body);
     */
    request.creditParty([
      {
        "key": "msisdn",
        "value": "+44012345678"
      }
    ]);
    request.debitParty([
      {
        "key": "walletid",
        "value": "1"
      }
    ]);
    request.amount("16.00");
    request.currency("USD");

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
    const request = new mmapi.disbursement.createReversal(originalTransactionReference);

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

const updateBatchTransaction = async (batchId, callback = false, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.updateBatchTransaction(batchId);

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
    const request = new mmapi.disbursement.viewAccountBalance({ "walletid": "1" });

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
    const request = new mmapi.disbursement.viewAccountTransactions({ "accountid": "2999" });

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

const viewBatchCompletions = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchCompletions(batchId);

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

const viewBatchRejections = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchRejections(batchId);

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

const viewBatchTransaction = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchTransaction(batchId);

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
    const request = new mmapi.disbursement.viewRequestState(serverCorrelationId);

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
    const request = new mmapi.disbursement.viewResource(link);

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
    const request = new mmapi.disbursement.viewResponse(clientCorrelationId);

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
    const request = new mmapi.disbursement.viewServiceAvailability();

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
    const request = new mmapi.disbursement.viewTransaction(transactionReference);

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

describe('Disbursements', () => {
  describe('Perform an Individual Disbursement', () => {
    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Bulk Disbursement', () => {
    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction(true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Bulk Disbursement with Maker / Checker', () => {
    let serverCorrelationId;
    let serverCorrelationId2;
    let objectReference;
    let objectReference2;
    let batchId;

    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction(undefined, false);

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

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction(objectReference, false);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data.batchStatus).toMatch(/^(created|approved|completed)$/);

        if(response.data.batchStatus === "created") {
          expect(response.data).toHaveProperty('creationDate');
        }

        if(response.data.batchStatus === "approved") {
          expect(response.data).toHaveProperty('approvalDate');
        }
        
        if(response.data.batchStatus === "completed") {
          expect(response.data).toHaveProperty('completionDate');
        }

        batchId = response.data.batchId
      });
    })

    describe('PATCH Approve The Transaction Batch', () => {
      it('should return the request state object with status 202 to indicate that the request is completed', async () => {
        const response = await updateBatchTransaction(batchId, true, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');

        serverCorrelationId2 = response.data.serverCorrelationId;
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewRequestState(serverCorrelationId2, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
        expect(response.data).toHaveProperty('objectReference');

        objectReference2 = response.data.objectReference;
      });
    })

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction(objectReference2, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data.batchStatus).toMatch(/^(created|approved|completed)$/);
        
        if(response.data.batchStatus === "created") {
          expect(response.data).toHaveProperty('creationDate');
        }

        if(response.data.batchStatus === "approved") {
          expect(response.data).toHaveProperty('approvalDate');
        }
        
        if(response.data.batchStatus === "completed") {
          expect(response.data).toHaveProperty('completionDate');
        }
      });
    })

    describe('GET Retrieve Batch Transactions that have Completed', () => {
      it('should return the batch completions object with status 200', async () => {
        const response = await viewBatchCompletions(batchId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('completionDate');
        expect(response.data).toHaveProperty('link');
      });
    })

    describe('GET Retrieve Batch Transactions that have been Rejected', () => {
      it('should return the batch rejections object with status 200', async () => {
        const response = await viewBatchRejections(batchId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('rejectionReason');
        expect(response.data).toHaveProperty('rejectionDate');
      });
    })
  });

  describe('Perform an Individual Disbursement Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(undefined, false);

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
        expect(response.data.type).toBe('disbursement');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Perform a Bulk Disbursement Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;
    let batchId;

    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction(undefined, false);

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

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction(objectReference, false);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data.batchStatus).toMatch(/^(created|approved|completed)$/);

        if(response.data.batchStatus === "created") {
          expect(response.data).toHaveProperty('creationDate');
        }

        if(response.data.batchStatus === "approved") {
          expect(response.data).toHaveProperty('approvalDate');
        }
        
        if(response.data.batchStatus === "completed") {
          expect(response.data).toHaveProperty('completionDate');
        }

        batchId = response.data.batchId
      });
    })

    describe('GET Retrieve Batch Transactions that have Completed', () => {
      it('should return the batch completions object with status 200', async () => {
        const response = await viewBatchCompletions(batchId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('completionDate');
        expect(response.data).toHaveProperty('link');
      });
    })

    describe('GET Retrieve Batch Transactions that have been Rejected', () => {
      it('should return the batch rejections object with status 200', async () => {
        const response = await viewBatchRejections(batchId, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('rejectionReason');
        expect(response.data).toHaveProperty('rejectionDate');
      });
    })
  });

  describe('Approve The Transaction Batch Using the Polling Method', () => {
    let serverCorrelationId;
    let serverCorrelationId2;
    let objectReference;
    let objectReference2;
    let batchId;

    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction(undefined, false);

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

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction(objectReference, false);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data.batchStatus).toMatch(/^(created|approved|completed)$/);

        if(response.data.batchStatus === "created") {
          expect(response.data).toHaveProperty('creationDate');
        }

        if(response.data.batchStatus === "approved") {
          expect(response.data).toHaveProperty('approvalDate');
        }
        
        if(response.data.batchStatus === "completed") {
          expect(response.data).toHaveProperty('completionDate');
        }

        batchId = response.data.batchId
      });
    })

    describe('PATCH Approve The Transaction Batch', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await updateBatchTransaction(batchId, undefined, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');

        serverCorrelationId2 = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewRequestState(serverCorrelationId2, false);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');
        expect(response.data).toHaveProperty('objectReference');

        objectReference2 = response.data.objectReference;
      });
    })

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction(objectReference2, false);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data.batchStatus).toMatch(/^(created|approved|completed)$/);
        
        if(response.data.batchStatus === "created") {
          expect(response.data).toHaveProperty('creationDate');
        }

        if(response.data.batchStatus === "approved") {
          expect(response.data).toHaveProperty('approvalDate');
        }
        
        if(response.data.batchStatus === "completed") {
          expect(response.data).toHaveProperty('completionDate');
        }
      });
    })
  });

  describe('Perform a Transaction Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(true, false);

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
  })

  describe('Obtain a Disbursement Organisation Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance(false);

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for a Disbursement Organisation', () => {
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

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(true, false);

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




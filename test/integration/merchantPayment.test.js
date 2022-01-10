const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createMerchantTransaction,
  viewRequestState,
  viewTransaction,
  createAuthorisationCode,
  createRefundTransaction,
  createReversal,
  viewAccountTransactions,
  viewAuthorisationCode
} = require('../../samples/index')

describe('Merchant Payments', () => {
  describe('Perform a Payee-Initiated Merchant Payment', () => {
    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction('merchantPayment', undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Payee-Initiated Merchant Payment via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction('merchantPayment');

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
        const response = await viewRequestState('merchantPayment', serverCorrelationId);

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
        const response = await viewTransaction('merchantPayment', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('merchantpay');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Perform a Payer-Initiated Merchant Payment', () => {
    describe('POST Payer Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction('merchantPayment', undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Payee-Initiated Merchant Payment using a Pre-authorised Payment Code', () => {
    describe('POST Obtain an Authorisation Code', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAuthorisationCode('merchantPayment', undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Payee-Initiated Merchant Payment using a Pre-authorised Payment Code Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Obtain an Authorisation Code', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAuthorisationCode('merchantPayment');

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
        const response = await viewRequestState('merchantPayment', serverCorrelationId);

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

    describe('GET View an Authorisation Code', () => {
      it('should return authorisation code object with status 200 for a given identifierType, identifier and authorisationCode', async () => {
        const response = await viewAuthorisationCode(objectReference, 'merchantPayment');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('authorisationCode');
        expect(response.data).toHaveProperty('codeState');
      });
    })
  });

  describe('Perform a Merchant Payment Refund', () => {
    describe('POST Perform a Merchant Payment Refund', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createRefundTransaction('merchantPayment', undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Merchant Payment Refund via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform a Merchant Payment Refund', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createRefundTransaction('merchantPayment');

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
        const response = await viewRequestState('merchantPayment', serverCorrelationId);

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
        const response = await viewTransaction('merchantPayment', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('adjustment');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Perform a Merchant Payment Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction('merchantPayment', undefined, undefined, true);

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
        const response = await viewRequestState('merchantPayment', serverCorrelationId);

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

    describe('POST Perform a Merchant Payment Reversal', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createReversal('merchantPayment', objectReference, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Obtain a Merchant Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance('merchantPayment');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Payments for a Merchant', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('merchantPayment');

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
        const response = await viewServiceAvailability('merchantPayment');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    let clientCorrelationId;
    let link;

    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction('merchantPayment', undefined, undefined, true);

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
        const response = await viewResponse('merchantPayment', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('merchantPayment', link);

        expect(response.status).toBe(200);
      });
    })
  });
})


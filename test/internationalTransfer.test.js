const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createQuotation,
  createInternationalTransaction,
  createReversal,
  viewAccountTransactions,
  viewQuotation,
  viewRequestState,
  viewTransaction
} = require('../samples/index')

describe('International Transfers', () => {
  describe('Perform an International Transfer', () => {
    describe('POST Request a International Transfer Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation('internationalTransfer');

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
        const response = await createInternationalTransaction('internationalTransfer', 'REF-1636533162268', undefined);

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
        const response = await createQuotation('internationalTransfer');

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
        const response = await createInternationalTransaction('internationalTransfer', 'REF-1636533162268', undefined);

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
        const response = await createInternationalTransaction('internationalTransfer', 'REF-1636533162268', undefined, true);

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
        const response = await viewRequestState('internationalTransfer', serverCorrelationId);

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
        const response = await viewTransaction('internationalTransfer', objectReference);

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
        const response = await createQuotation('internationalTransfer', undefined, true);

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
        const response = await viewRequestState('internationalTransfer', serverCorrelationId);

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
        const response = await viewQuotation('internationalTransfer', objectReference);

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
        const response = await createInternationalTransaction('internationalTransfer', 'REF-1636533162268', undefined);

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
        const response = await viewRequestState('internationalTransfer', serverCorrelationId);

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
        const response = await createReversal('internationalTransfer', objectReference);

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
        const response = await viewAccountBalance('internationalTransfer');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for a Financial Service Provider', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('internationalTransfer');

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
        const response = await viewServiceAvailability('internationalTransfer');

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
        const response = await createInternationalTransaction('internationalTransfer', 'REF-1636533162268', undefined);

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
        const response = await viewResponse('internationalTransfer', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('internationalTransfer', link);

        expect(response.status).toBe(200);
      });
    })
  });
})
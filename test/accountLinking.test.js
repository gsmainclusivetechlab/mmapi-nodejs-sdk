const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createAccountLink,
  createTransferTransaction,
  viewRequestState,
  viewTransaction,
  createReversal,
  viewAccountTransactions,
  viewAccountLink
} = require('../samples/index')

describe('Account Linking', () => {
  describe('Setup an Account Link', () => {
    describe('POST Establish an Account to Account Link', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccountLink('accountLinking', undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Setup an Account Link via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Establish an Account to Account Link', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccountLink('accountLinking');

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
        const response = await viewRequestState('accountLinking', serverCorrelationId);

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

    describe('GET View A Link', () => {
      it('should return link object with status 200 for a given object reference', async () => {
        const response = await viewAccountLink('accountLinking', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('linkReference');
        expect(response.data).toHaveProperty('sourceAccountIdentifiers');
        expect(response.data).toHaveProperty('mode');
        expect(response.data).toHaveProperty('status');
      });
    })
  });

  describe('Perform a Transfer for a Linked Account', () => {
    describe('POST Use a Link to make a Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction('accountLinking', { linkReference: 'REF-1638280960220' }, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Transfer using an Account Link via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Use a Link to make a Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction('accountLinking', { linkReference: 'REF-1638280960220' });

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
        const response = await viewRequestState('accountLinking', serverCorrelationId);

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
        const response = await viewTransaction('accountLinking', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('transfer');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Perform a Transfer Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Use a Link to make a Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction('accountLinking', { linkReference: 'REF-1638280960220' }, true);

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
        const response = await viewRequestState('accountLinking', serverCorrelationId);

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
        const response = await createReversal('accountLinking', objectReference, undefined, true);

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
        const response = await viewAccountBalance('accountLinking');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transfers for a Financial Service Provider', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('accountLinking');

        expect(response.status).toBe(200);
        expect(response.data.length).toBe(20);
        expect(response.headers).toHaveProperty('x-records-available-count');
        expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Check for Service Availability', () => {
    describe('GET Check for Service Availability', () => {
      it('should return the heartbeat object with status 200 to indicate the status available, unavailable or degraded', async () => {
        const response = await viewServiceAvailability('accountLinking');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response', () => {
    let clientCorrelationId;
    let link;

    describe('POST Establish an Account to Account Link', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccountLink('accountLinking', undefined, undefined, true);

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
        const response = await viewResponse('accountLinking', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('accountLinking', link);

        expect(response.status).toBe(200);
      });
    })
  });
})




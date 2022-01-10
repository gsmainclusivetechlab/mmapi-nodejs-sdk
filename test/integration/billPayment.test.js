const {
  viewAccountBills,
  createBillPayment,
  createBillTransaction,
  viewTransaction,
  viewBillPayment,
  viewRequestState,
  viewServiceAvailability,
  viewResponse,
  viewResource
} = require('../../samples/index')

describe('Bill Payments', () => {
  describe('Successful Retrieval of Bills', () => {
    describe('GET Retrieve a Set of Bills', () => {
      it('should return the bills object with status 200', async () => {
        const response = await viewAccountBills('billPayment');

        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('x-records-available-count');
        expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Make a Successful Bill Payment with Callback', () => {
    describe('POST Make a Bill Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBillPayment('billPayment', undefined, undefined, undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Make a Successful Bill Transaction with Polling', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Make a Bill Transaction Via the Polling Method', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBillTransaction('billPayment');

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
        const response = await viewRequestState('billPayment', serverCorrelationId);

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
        const response = await viewTransaction('billPayment', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('billpay');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Make a Bill Payment with Polling', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Make a Bill Payment Via the Polling Method', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBillPayment('billPayment');

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
        const response = await viewRequestState('billPayment', serverCorrelationId);

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

    describe('GET Retrieve Bill Payments for a Given Bill', () => {
      it('should return bill payment object with status 200 for a given object reference', async () => {
        const response = await viewBillPayment('billPayment', undefined, objectReference);

        expect(response.status).toBe(200);
        if (response.data.length) {
          response.data.forEach(data => {
            expect(data).toHaveProperty('billPaymentStatus');
            expect(data).toHaveProperty('amountPaid');
            expect(data).toHaveProperty('currency');
          });
        }
        expect(response.headers).toHaveProperty('x-records-available-count');
        expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Retrieval of Bill Payments', () => {
    describe('GET Retrieve a Set of Bill Payments', () => {
      it('should return bill payments array with status 200 for a given bill reference', async () => {
        const response = await viewBillPayment('billPayment', undefined, 'REF-000001');

        expect(response.status).toBe(200);
        if (response.data.length) {
          response.data.forEach(data => {
            expect(data).toHaveProperty('billPaymentStatus');
            expect(data).toHaveProperty('amountPaid');
            expect(data).toHaveProperty('currency');
          });
        }
        expect(response.headers).toHaveProperty('x-records-available-count');
        expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Check for Service Availability', () => {
    describe('GET Check for Service Availability', () => {
      it('should return the heartbeat object with status 200 to indicate the status available, unavailable or degraded', async () => {
        const response = await viewServiceAvailability('billPayment');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    let clientCorrelationId;
    let link;

    describe('POST Make a Bill Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBillPayment('billPayment');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');

        clientCorrelationId = response.config.headers['X-CorrelationID']
      });
    })

    describe('GET Retrieve a Missing Response', () => {
      it('should return a response object with status 200 containing a link to the missing resource', async () => {
        const response = await viewResponse('billPayment', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('billPayment', link);

        expect(response.status).toBe(200);
      });
    })
  });
})
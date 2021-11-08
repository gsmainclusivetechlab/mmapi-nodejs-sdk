require('./test_helper');

const client = require('./test_harness').client();

const { createAMerchantPayTransaction } = require('../samples/merchantPayment/createAMerchantPayTransaction');
const { createARefundTransaction } = require('../samples/merchantPayment/createARefundTransaction');
const { createAnAuthorisationCode } = require('../samples/merchantPayment/createAnAuthorisationCode');

const { createAReversal } = require('../samples/common/createAReversal');
const { viewAccountBalance } = require('../samples/common/viewAccountBalance');
const { viewAccountSpecificTransaction } = require('../samples/common/viewAccountSpecificTransaction');
const { checkApiAvailability } = require('../samples/common/checkApiAvailability');
const { viewAResponse } = require('../samples/common/viewAResponse');
const { viewARequestState } = require('../samples/common/viewARequestState');
const { viewATransaction } = require('../samples/common/viewATransaction');
const { viewAResource } = require('../samples/common/viewAResource');

describe('Merchant Payments', () => {
  describe('Perform a Payee-Initiated Merchant Payment', () => {
    describe('Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

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

    describe('Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction(true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewARequestState(serverCorrelationId);

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

    describe('Retrieve a Transaction', () => {
      it('should return transactions object with status 200 for a given object reference', async () => {
        const response = await viewATransaction(objectReference);

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
    describe('Payer Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

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
    describe('Obtain an Authorisation Code', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAnAuthorisationCode('accountid', '2000');

        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Merchant Payment Refund', () => {
    describe('Perform a Merchant Payment Refund', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createARefundTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Merchant Payment Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('Poll to Determine the Request State', () => {
      it('should return the request state object with status 200 for a given server correlation id', async () => {
        const response = await viewARequestState(serverCorrelationId);

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

    describe('Perform a Merchant Payment Reversal', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAReversal(objectReference);

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
    describe('Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance('accountid', '2000');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Payments for a Merchant', () => {
    describe('Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountSpecificTransaction('accountid', '2000', 0, 20);

        expect(response.status).toBe(200);
        expect(response.data.length).toBe(20);
        // expect(response.headers).toHaveProperty('x-records-available-count');
        // expect(response.headers).toHaveProperty('x-records-returned-count');
      });
    })
  });

  describe('Check for API Provider Service Availability', () => {
    describe('Check for Service Availability', () => {
      it('should return the heartbeat object with status 200 to indicate the status available, unavailable or degraded', async () => {
        const response = await checkApiAvailability();

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    let clientCorrelationId;
    let link;

    describe('Payee Initiated Merchant Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');

        clientCorrelationId = response.config.headers['X-CorrelationID']
      });
    })

    describe('Retrieve a Missing Response', () => {
      it('should return a response object with status 200 containing a link to the missing resource', async () => {
        const response = await viewAResponse(clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewAResource(link);

        expect(response.status).toBe(200);
      });
    })
  });
})




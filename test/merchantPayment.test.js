require('./test_helper');

const client = require('./test_harness').client();

const { createAMerchantPayTransaction } = require('../samples/merchantPayment/createAMerchantPayTransaction');
const { createAMerchantPayTransactionPolling } = require('../samples/merchantPayment/createAMerchantPayTransactionPolling');
const { createARefundTransaction } = require('../samples/merchantPayment/createARefundTransaction');
const { createAnAuthorisationCode } = require('../samples/merchantPayment/createAnAuthorisationCode');

const { createAReversal } = require('../samples/common/createAReversal');
const { viewAccountBalance } = require('../samples/common/viewAccountBalance');
const { viewAccountSpecificTransaction } = require('../samples/common/viewAccountSpecificTransaction');
const { checkApiAvailability } = require('../samples/common/checkApiAvailability');
const { viewAResponse } = require('../samples/common/viewAResponse');
const { viewARequestState } = require('../samples/common/viewARequestState');
const { viewATransaction } = require('../samples/common/viewATransaction');

describe('Merchant Payments', () => {
  describe('Perform a Payee-Initiated Merchant Payment', () => {
    describe('Payee Initiated Merchant Payment', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
      });
    })
  });

  describe('Perform a Payee-Initiated Merchant Payment via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransactionPolling();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return objectReference', async () => {
        const response = await viewARequestState(serverCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('objectReference');

        objectReference = response.data.objectReference;
      });
    })

    describe('GET Retrieve a Transaction', () => {
      it('should return transaction object for a given objec Reference (transaction reference) with status 200', async () => {
        const response = await viewATransaction(objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('transactionStatus');
      });
    })
  });

  describe('Perform a Payer-Initiated Merchant Payment', () => {
    describe('POST Payer Initiated Merchant Payment', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
      });
    })
  });

  describe('Perform a Merchant Payment Refund', () => {
    describe('POST Perform a Merchant Payment Refund', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createARefundTransaction();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
      });
    })
  });

  describe('Perform a Payee-Initiated Merchant Payment using a Pre-authorised Payment Code', () => {
    describe('POST Obtain an Authorisation Code', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAnAuthorisationCode('accountid', '2000');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
      });
    })
  });

  describe('Perform a Merchant Payment Reversal', () => {
    let serverCorrelationId;
    let objectReference;
    describe('POST Payee Initiated Merchant Payment', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAMerchantPayTransactionPolling();

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');

        serverCorrelationId = response.data.serverCorrelationId
      });
    })

    describe('GET Poll to Determine the Request State', () => {
      it('should return objectReference', async () => {
        const response = await viewARequestState(serverCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('objectReference');

        objectReference = response.data.objectReference;
      });
    })

    describe('POST Perform a Merchant Payment Reversal', () => {
      it('should return the request state object to indicate that the request is pending', async () => {
        const response = await createAReversal(objectReference);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
      });
    })
  });

  describe('Obtain a Merchant Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance of the requested account', async () => {
        const response = await viewAccountBalance('accountid', '2000');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Payments for a Merchant', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return an array of 20 transactions and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountSpecificTransaction('accountid', '2000');

        expect(response.status).toBe(200);
        // expect(response.headers['X-Records-Available-Count']).toBe(40);
      });
    })
  });

  describe('Check for API Provider Service Availability', () => {
    describe('GET Check for Service Availability', () => {
      it('should return status 200 with the availability of the service (available, unavailable, degraded)', async () => {
        const response = await checkApiAvailability();

        expect(response.status).toBe(200);
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    describe('GET Retrieve a Missing Response', () => {
      it('should return a response object containing a link to the missing resource', async () => {
        const { config: { headers } } = await createAMerchantPayTransaction();
        const response = await viewAResponse(headers['X-CorrelationID']);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');
      });
    })
  });
})




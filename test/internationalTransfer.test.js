require('./test_helper');

const client = require('./test_harness').client();

const {
  createANewQuotation,
  createAIntTransferTransaction
} = require('../samples/index').internationalTransfer;

const {
  createAReversal,
  viewAccountBalance,
  viewAccountSpecificTransaction,
  checkApiAvailability,
  viewAResponse,
  viewARequestState,
  viewATransaction,
  viewAResource
} = require('../samples/index').common;

describe('International Transfers', () => {
  describe('Perform an International Transfer', () => {
    describe('POST Request a International Transfer Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createANewQuotation(false);

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
        let quotationReference = 'REF-1636533162268';
        let quoteId = undefined;
        const response = await createAIntTransferTransaction(quotationReference, quoteId, false);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });
})
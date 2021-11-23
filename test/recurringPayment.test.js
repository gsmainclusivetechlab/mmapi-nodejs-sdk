const {
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  viewRequestState,
  viewTransaction,
  createReversal,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createAccountDebitMandate,
  viewAccountDebitMandate,
  createMerchantTransaction,
  createRefundTransaction
} = require('../samples/index')

const buildAccountDebitMandateRequestBody = () => ({
  "payee": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestDate": "2018-07-03T10:43:27.405Z",
  "startDate": "2018-07-03T10:43:27.405Z",
  "currency": "GBP",
  "amountLimit": "1000.00",
  "endDate": "2028-07-03T10:43:27.405Z",
  "numberOfPayments": "2",
  "frequencyType": "sixmonths",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ]
});

const buildMerchantTransactionRequestBody = (mandateReference) => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "mandatereference",
      "value": `${mandateReference}`
    }
  ],
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "currency": "RWF"
});

const buildRefundTransactionRequestBody = (mandateReference) => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "creditParty": [
    {
      "key": "mandateReference",
      "value": `${mandateReference}`
    }
  ],
  "currency": "RWF"
});

describe('Recurring Payments', () => {
  describe('Setup a Recurring Payment', () => {
    describe('POST Setup a Recurring Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccountDebitMandate(buildAccountDebitMandateRequestBody(), 'accountid', '2000', 'recurringPayment');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Setup a Recurring Payment via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Setup a Recurring Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccountDebitMandate(buildAccountDebitMandateRequestBody(), 'accountid', '2000', 'recurringPayment', true)

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
        const response = await viewRequestState(serverCorrelationId);

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

    describe('GET View A Debit Mandate', () => {
      it('should return debit mandate object with status 200 for a given object reference', async () => {
        const response = await viewAccountDebitMandate('accountid', '2000', objectReference, 'recurringPayment');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('mandateReference');
        expect(response.data).toHaveProperty('startDate');
      });
    })
  });

  describe('Take a Recurring Payment', () => {
    describe('POST Take a Recurring Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction(buildMerchantTransactionRequestBody('REF-1637669509954'), 'recurringPayment');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Take a Recurring Payment via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Take a Recurring Payment', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createMerchantTransaction(buildMerchantTransactionRequestBody('REF-1637669509954'), 'recurringPayment', true);

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
        const response = await viewRequestState(serverCorrelationId);

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
        const response = await viewTransaction(objectReference);

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

  describe('Recurring Payment Refund', () => {
    describe('POST Perform a Recurring Payment Refund', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createRefundTransaction(buildRefundTransactionRequestBody('REF-1637670547701'), 'recurringPayment');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });
});





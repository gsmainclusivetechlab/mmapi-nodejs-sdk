const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  createReversal,
  viewAccountTransactions,
  viewRequestState,
  viewTransaction
} = require('../samples/index')

const buildQuotationRequestBody = () => ({
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestAmount": "75.30",
  "requestCurrency": "RWF",
  "requestDate": "2018-07-03T11:43:27.405Z",
  "type": "transfer",
  "subType": "abc",
  "chosenDeliveryMethod": "directtoaccount",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ]
});

const buildTransferTransactionRequestBody = (quotationReference) => ({
  "amount": "100.00",
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "currency": "GBP",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "internationalTransferInformation": {
    "originCountry": "AD",
    "quotationReference": `${quotationReference}`,
    // "quoteId": "{{quoteId}}",
    "remittancePurpose": "personal",
    "deliveryMethod": "agent"
  },
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
});

const buildBilateralTransferTransactionRequestBody = () => ({
  "amount": "100.00",
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "currency": "GBP",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
})

describe('P2P Transfers', () => {
  describe('Perform a P2P Transfer via Switch', () => {
    describe('GET Retrieve the Name of the Recipient', () => {
      it('should return the account holder name object with status 200', async () => {
        const response = await viewAccountName('walletid', '1', 'p2pTransfer');

        expect(response.status).toBe(200);
      });
    })

    describe('POST Request a P2P Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation(buildQuotationRequestBody(), 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    describe('POST Perform a P2P Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a P2P Transfer via the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform a P2P Transfer', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), 'p2pTransfer', true)

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
        const response = await viewRequestState(serverCorrelationId, 'p2pTransfer');

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
        const response = await viewTransaction(objectReference, 'p2pTransfer');

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

  describe('Perform a Bilateral P2P Transfer', () => {
    describe('GET Retrieve the Name of the Recipient', () => {
      it('should return the account holder name object with status 200', async () => {
        const response = await viewAccountName('walletid', '1', 'p2pTransfer');

        expect(response.status).toBe(200);
      });
    })

    describe('POST Perform a P2P Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildBilateralTransferTransactionRequestBody(), 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform an ‘On-us’ P2P Transfer Initiated by a Third Party Provider', () => {
    describe('GET Retrieve the Name of the Recipient', () => {
      it('should return the account holder name object with status 200', async () => {
        const response = await viewAccountName('walletid', '1', 'p2pTransfer');

        expect(response.status).toBe(200);
      });
    })

    describe('POST Request a P2P Quotation', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createQuotation(buildQuotationRequestBody(), 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    describe('POST Perform a P2P Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('P2P Transfer Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform a P2P Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), 'p2pTransfer');

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
        const response = await viewRequestState(serverCorrelationId, 'p2pTransfer');

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
        const response = await createReversal({}, objectReference, 'p2pTransfer');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Obtain an FSP Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance('accountid', '2000', 'p2pTransfer');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for an FSP', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('accountid', '2000', 0, 20, 'p2pTransfer');

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
        const response = await viewServiceAvailability('p2pTransfer');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response', () => {
    let clientCorrelationId;
    let link;

    describe('POST Perform a P2P Transfer', () => {
      it('should return request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), 'p2pTransfer');

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
        const response = await viewResponse(clientCorrelationId, 'p2pTransfer');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource(link, 'p2pTransfer');

        expect(response.status).toBe(200);
      });
    })
  });
})




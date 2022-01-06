const {
  createAccount,
  createWithdrawalTransaction,
  createAuthorisationCode,
  createDepositTransaction,
  createReversal,
  updateAccountIdentity,
  viewRequestState,
  viewTransaction,
  viewAuthorisationCode,
  viewAccountName,
  viewAccount,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewResource
} = require('../samples/index');

describe('Agent Services (including Cash-In and Cash-Out)', () => {
  describe('Agent-initiated Cash-out using the Callback Method', () => {
    describe('POST Agent Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService', undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Agent-initiated Cash-out using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Agent Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService');

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
        const response = await viewRequestState('agentService', serverCorrelationId);

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
        const response = await viewTransaction('agentService', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('withdrawal');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Customer-initiated Cash-out using the Callback Method', () => {
    describe('POST Customer Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService', undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Customer Cash - out at an ATM using an Authorisation Code', () => {
    let serverCorrelationId;
    let objectReference;
    let authorisationCode;

    describe('POST Obtain an Authorisation Code', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAuthorisationCode('agentService');

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
        const response = await viewRequestState('agentService', serverCorrelationId);

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
        const response = await viewAuthorisationCode(objectReference, 'agentService');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('authorisationCode');
        expect(response.data).toHaveProperty('codeState');

        authorisationCode = response.data.authorisationCode;
      });
    })

    describe('POST ATM Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService', { "type": "transfer", 'oneTimeCode': authorisationCode }, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Agent-initiated Customer Cash-in', () => {
    describe('GET Retrieve the Name of the Depositing Customer', () => {
      it('should return the account holder name object with status 200', async () => {
        const response = await viewAccountName('agentService');

        expect(response.status).toBe(200);
      });
    })

    describe('POST Agent Initiated Cash-in', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDepositTransaction('agentService', undefined, true);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Cash-out Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Agent Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService');

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
        const response = await viewRequestState('agentService', serverCorrelationId);

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

    describe('POST Perform a Transaction Reversal', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createReversal('agentService', objectReference);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');
      });
    })
  });

  describe('Register a Customer Mobile Money Account', () => {
    let serverCorrelationId;
    let objectReference;

    var minm = parseInt('00000000');
    var maxm = parseInt('99999999');
    let msisdn = '+44' + Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    describe('POST Create a Mobile Money Account', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createAccount('agentService', { 'msisdn': msisdn });

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
        const response = await viewRequestState('agentService', serverCorrelationId);

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

    describe('GET View an Account', () => {
      it('should return the account object with status 200', async () => {
        const response = await viewAccount('agentService', { 'msisdn': objectReference.substr(7) });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('accountIdentifiers');
        expect(response.data).toHaveProperty('identity');
        expect(response.data).toHaveProperty('accountStatus');
      });
    })
  });

  describe('Verify a Customer’s KYC', () => {
    describe('GET View an Account', () => {
      it('should return the account object with status 200', async () => {
        const response = await viewAccount('agentService');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('accountIdentifiers');
        expect(response.data).toHaveProperty('identity');
        expect(response.data).toHaveProperty('accountStatus');
      });
    })

    describe('PATCH Update KYC Verification Status', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await updateAccountIdentity('agentService');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('polling');
      });
    })
  });

  describe('Obtain an Agent Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance('agentService');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for an Agent', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('agentService');

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
        const response = await viewServiceAvailability('agentService');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response', () => {
    let clientCorrelationId;
    let link;

    describe('POST Agent Initiated Cash-Out', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createWithdrawalTransaction('agentService', undefined, true);

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
        const response = await viewResponse('agentService', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('agentService', link);

        expect(response.status).toBe(200);
      });
    })
  });
})
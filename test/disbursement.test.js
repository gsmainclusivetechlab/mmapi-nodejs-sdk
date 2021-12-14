const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createDisbursementTransaction,
  createBatchTransaction,
  viewBatchTransaction,
  viewBatchCompletions,
  viewBatchRejections,
  updateBatchTransaction,
  viewRequestState,
  viewTransaction,
  createReversal,
  viewAccountTransactions,

  createDisbursementTransactionRequestBody
} = require('../samples/index')

describe('Disbursements', () => {
  describe('Perform an Individual Disbursement', () => {
    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(createDisbursementTransactionRequestBody['disbursement'](), 'disbursement');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  });

  describe('Perform a Bulk Disbursement', () => {
    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction('disbursement');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    let batchId = "REF-1636655437716"

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data).toHaveProperty('approvalDate');
        expect(response.data).toHaveProperty('completionDate');
      });
    })

    describe('GET Retrieve Batch Transactions that have Completed', () => {
      it('should return the batch completions object with status 200', async () => {
        const response = await viewBatchCompletions('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('completionDate');
        expect(response.data).toHaveProperty('link');
      });
    })

    describe('GET Retrieve Batch Transactions that have been Rejected', () => {
      it('should return the batch rejections object with status 200', async () => {
        const response = await viewBatchRejections('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('rejectionReason');
        expect(response.data).toHaveProperty('rejectionDate');
      });
    })
  });

  describe('Perform a Bulk Disbursement with Maker / Checker', () => {
    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction('disbursement');

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    let batchId = "REF-1636655437716"

    describe('PATCH Approve The Transaction Batch', () => {
      it('should return the request state object with status 202 to indicate that the request is completed', async () => {
        const response = await updateBatchTransaction('disbursement', batchId);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data).toHaveProperty('approvalDate');
        expect(response.data).toHaveProperty('completionDate');
      });
    })

    describe('GET Retrieve Batch Transactions that have Completed', () => {
      it('should return the batch completions object with status 200', async () => {
        const response = await viewBatchCompletions('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('completionDate');
        expect(response.data).toHaveProperty('link');
      });
    })

    describe('GET Retrieve Batch Transactions that have been Rejected', () => {
      it('should return the batch rejections object with status 200', async () => {
        const response = await viewBatchRejections('disbursement', batchId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('creditParty');
        expect(response.data).toHaveProperty('debitParty');
        expect(response.data).toHaveProperty('rejectionReason');
        expect(response.data).toHaveProperty('rejectionDate');
      });
    })
  });

  describe('Perform an Individual Disbursement Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(createDisbursementTransactionRequestBody['disbursement'](), 'disbursement', true);

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
        const response = await viewRequestState('disbursement', serverCorrelationId);

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
        const response = await viewTransaction(objectReference, 'disbursement');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('transactionReference');
        expect(response.data).toHaveProperty('type');
        expect(response.data.type).toBe('disbursement');
        expect(response.data).toHaveProperty('transactionStatus');
        expect(response.data).toHaveProperty('amount');
        expect(response.data).toHaveProperty('currency');
      });
    })
  });

  describe('Perform a Bulk Disbursement Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform a Bulk Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createBatchTransaction('disbursement', undefined, true);

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
        const response = await viewRequestState('disbursement', serverCorrelationId);

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

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction('disbursement', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data).toHaveProperty('approvalDate');
        expect(response.data).toHaveProperty('completionDate');
      });
    })
  });

  describe('Approve The Transaction Batch Using the Polling Method', () => {
    let serverCorrelationId;
    let objectReference;

    describe('PATCH Approve The Transaction Batch', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await updateBatchTransaction('disbursement', "REF-1636656115835", true);

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
        const response = await viewRequestState('disbursement', serverCorrelationId);

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

    describe('GET View A Transaction Batch', () => {
      it('should return the batch transactions object with status 200', async () => {
        const response = await viewBatchTransaction('disbursement', objectReference);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('batchId');
        expect(response.data).toHaveProperty('batchStatus');
        expect(response.data).toHaveProperty('approvalDate');
        expect(response.data).toHaveProperty('completionDate');
      });
    })
  });

  describe('Perform a Transaction Reversal', () => {
    let serverCorrelationId;
    let objectReference;

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(createDisbursementTransactionRequestBody['disbursement'](), 'disbursement');

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
        const response = await viewRequestState('disbursement', serverCorrelationId);

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
        const response = await createReversal('disbursement', objectReference);

        expect(response.status).toBe(202);
        expect(response.data).toHaveProperty('status');
        expect(response.data.status).toBe('pending');
        expect(response.data).toHaveProperty('serverCorrelationId');
        expect(response.data).toHaveProperty('notificationMethod');
        expect(response.data.notificationMethod).toBe('callback');
      });
    })
  })

  describe('Obtain a Disbursement Organisation Balance', () => {
    describe('GET Get an Account Balance', () => {
      it('should return the balance object with status 200', async () => {
        const response = await viewAccountBalance('disbursement');

        expect(response.status).toBe(200);
      });
    })
  });

  describe('Retrieve Transactions for a Disbursement Organisation', () => {
    describe('GET Retrieve a Set of Transactions for an Account', () => {
      it('should return a transactions array of length 20 and indicate via response header how many transactions available in total', async () => {
        const response = await viewAccountTransactions('disbursement');

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
        const response = await viewServiceAvailability('disbursement');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('serviceStatus');
        expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      });
    })
  });

  describe('Retrieve a Missing API Response from an API Provider', () => {
    let clientCorrelationId;
    let link;

    describe('POST Perform an Individual Disbursement', () => {
      it('should return the request state object with status 202 to indicate that the request is pending', async () => {
        const response = await createDisbursementTransaction(createDisbursementTransactionRequestBody['disbursement'](), 'disbursement');

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
        const response = await viewResponse('disbursement', clientCorrelationId);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('link');

        link = response.data.link;
      });
    })

    describe('GET Retrieve a Missing Resource', () => {
      it('should return the requested object with status 200 containing a representation of the missing resource', async () => {
        const response = await viewResource('disbursement', link);

        expect(response.status).toBe(200);
      });
    })
  });
})




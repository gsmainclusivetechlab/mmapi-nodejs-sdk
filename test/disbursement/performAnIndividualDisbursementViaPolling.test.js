require('../test_helper');

const client = require('../test_harness').client();

const { PerformAnIndividualDisbursementViaPollingRequest } = mobileMoneyApi.disbursement;

const buildRequestBody = () => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
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

const performAnIndividualDisbursementViaPolling = async () => {
  const request = new PerformAnIndividualDisbursementViaPollingRequest();
  request.data = buildRequestBody();

  const response = await client.execute(request);

  return response;
}

describe('Perform An Individual Disbursement', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAnIndividualDisbursementViaPolling();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
    expect(response.data).toHaveProperty('serverCorrelationId');
  });
});

module.exports = {
  performAnIndividualDisbursementViaPolling: performAnIndividualDisbursementViaPolling,
}



require('../test_helper');

const client = require('../test_harness').client();

const { PerformAnIndividualDisbursementRequest } = mobileMoneyApi.disbursement;

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

buildXCallbackURL = () => 'https://322894a8-6c41-4b35-80cc-7fbfec49c4a2.mock.pstmn.io/pramisha';

const performAnIndividualDisbursement = async () => {
  const request = new PerformAnIndividualDisbursementRequest();
  request.data = buildRequestBody();
  request.headers['X-Callback-URL'] = buildXCallbackURL();

  const response = await client.execute(request);

  return response;
}

describe('Perform An Individual Disbursement', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAnIndividualDisbursement();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
    expect(response.data).toHaveProperty('serverCorrelationId');
  });
});

module.exports = {
  performAnIndividualDisbursement: performAnIndividualDisbursement,
}



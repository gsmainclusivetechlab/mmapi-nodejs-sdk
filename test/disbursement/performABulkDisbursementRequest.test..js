require('../test_helper');

const client = require('../test_harness').client();

const { PerformABulkDisbursementRequest } = mobileMoneyApi.disbursement;

const buildRequestBody = () => ({
  "transactions": [
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ]
    },
    {
      "amount": "200.00",
      "type": "transfer",
      "creditParty": [
        {
          "key": "accountid",
          "value": "2999"
        }
      ],
      "currency": "RWF",
      "debitParty": [
        {
          "key": "accountid",
          "value": "2000"
        }
      ]
    }
  ],
  "batchTitle": "Batch_Test",
  "batchDescription": "Testing a Batch",
  "scheduledStartDate": "2019-12-11T15:08:03.158Z"
});

buildXCallbackURL = () => 'https://322894a8-6c41-4b35-80cc-7fbfec49c4a2.mock.pstmn.io/pramisha';

const performABulkDisbursement = async () => {
  const request = new PerformABulkDisbursementRequest();
  request.data = buildRequestBody();
  request.headers['X-Callback-URL'] = buildXCallbackURL();

  const response = await client.execute(request);

  return response;
}

describe('Perform A Bulk Disbursement', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performABulkDisbursement();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
    expect(response.data).toHaveProperty('serverCorrelationId');
  });
});

module.exports = {
  performABulkDisbursement: performABulkDisbursement,
}



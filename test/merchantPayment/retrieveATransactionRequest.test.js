require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveATransactionRequest } = mobileMoneyApi.merchantPayment;

const { PollToDetermineTheRequestState } = require('./pollToDetermineTheRequestStateRequest.test');

const retrieveATransactionRequest = async () => {
  const request = new RetrieveATransactionRequest();
  const { data: { objectReference } } = await PollToDetermineTheRequestState();
  request.transactionReference(objectReference);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve A Transaction Request', () => {
  it('should return transaction object for a given objec Reference (transaction reference) with status 200', async () => {
    const response = await retrieveATransactionRequest();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('transactionReference');
    expect(response.data).toHaveProperty('transactionStatus');
  });
});

module.exports = {
  RetrieveATransaction: retrieveATransactionRequest
}


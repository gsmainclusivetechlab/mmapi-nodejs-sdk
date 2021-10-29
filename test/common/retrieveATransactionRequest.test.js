require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveATransactionRequest } = mobileMoneyApi.common;

const { pollToDetermineTheRequestState } = require('../common/pollToDetermineTheRequestState.test');

const retrieveATransaction = async () => {
  const { data: { objectReference } } = await pollToDetermineTheRequestState();
  const request = new RetrieveATransactionRequest(objectReference);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve A Transaction Request', () => {
  it('should return transaction object for a given objec Reference (transaction reference) with status 200', async () => {
    const response = await retrieveATransaction();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('transactionReference');
    expect(response.data).toHaveProperty('transactionStatus');
  });
});

module.exports = {
  retrieveATransaction: retrieveATransaction
}


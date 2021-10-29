require('../test_helper');

const client = require('../test_harness').client();

const { PerformATransactionReversalRequest } = mobileMoneyApi.common;

const { pollToDetermineTheRequestState } = require('./pollToDetermineTheRequestState.test')


const performATransactionReversal = async () => {
  const { data: { objectReference } } = await pollToDetermineTheRequestState();
  const request = new PerformATransactionReversalRequest(objectReference);

  const response = await client.execute(request);

  return response;
}

describe('Perform A Transaction Reversal', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performATransactionReversal();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
  });
});

module.exports = {
  performATransactionReversal: performATransactionReversal
}
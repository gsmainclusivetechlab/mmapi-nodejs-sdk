require('../test_helper');

const client = require('../test_harness').client();

const { GetAnAccountBalanceRequest } = mobileMoneyApi.merchantPayment;

const getAnAccountBalance = async () => {
  const request = new GetAnAccountBalanceRequest('accountid', 2000);

  const response = await client.execute(request);

  return response;
}

describe('Get An Account Balance Request ', () => {
  it('should return the balance of the requested account with status 200', async () => {
    const response = await getAnAccountBalance();

    expect(response.status).toBe(200);
  });
});

module.exports = {
  getAnAccountBalance: getAnAccountBalance
}
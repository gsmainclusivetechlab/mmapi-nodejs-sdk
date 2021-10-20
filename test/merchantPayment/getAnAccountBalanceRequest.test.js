require('../test_helper');

const client = require('../test_harness').client();

const { GetAnAccountBalanceRequest } = mobileMoneyApi.merchantPayment;

const getAnAccountBalanceRequest = async () => {
  const request = new GetAnAccountBalanceRequest();
  request.identifierType('accountid');
  request.identifier(2000);

  const response = await client.execute(request);

  return response;
}

describe('Get An Account Balance Request ', () => {
  it('should return the balance of the requested account with status 200', async () => {
    const response = await getAnAccountBalanceRequest();

    expect(response.status).toBe(200);
  });
});

module.exports = {
  GetAnAccountBalance: getAnAccountBalanceRequest
}
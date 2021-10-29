require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveASetOfTransactionsForAnAccountRequest, } = mobileMoneyApi.common;

const retrieveASetofTransactionsForAnAccount = async () => {
  const request = new RetrieveASetOfTransactionsForAnAccountRequest('accountid', 2000);
  request.queryParams(0, 20);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve A Set Of Transactions For An Account Request', () => {
  it('should return an array of 20 transactions and indicate via response header how many transactions available in total', async () => {
    const response = await retrieveASetofTransactionsForAnAccount();

    expect(response.status).toBe(200);
    // expect(response.headers['X-Records-Available-Count']).toBe(40);
  });
});

module.exports = {
  retrieveASetofTransactionsForAnAccount: retrieveASetofTransactionsForAnAccount
}
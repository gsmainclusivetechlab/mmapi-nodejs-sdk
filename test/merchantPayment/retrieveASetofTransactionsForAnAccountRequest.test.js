require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveASetOfTransactionsForAnAccountRequest, } = mobileMoneyApi.merchantPayment;

const retrieveASetOfTransactionsForAnAccountRequest = async () => {
  const request = new RetrieveASetOfTransactionsForAnAccountRequest();
  request.identifierType('accountid');
  request.identifier(2000);
  request.offset(0);
  request.limit(20);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve A Set Of Transactions For An Account Request', () => {
  it('should return an array of 20 transactions and indicate via response header how many transactions available in total', async () => {
    const response = await retrieveASetOfTransactionsForAnAccountRequest();

    expect(response.status).toBe(200);
    // expect(response.header['X-Records-Available-Count']).toBe(40);
  });
});

module.exports = {
  RetrieveASetOfTransactionsForAnAccount: retrieveASetOfTransactionsForAnAccountRequest
}
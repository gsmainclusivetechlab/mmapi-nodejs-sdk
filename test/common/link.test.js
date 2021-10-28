
require('../test_helper');

const client = require('../test_harness').client();

const { LinkRequest } = mobileMoneyApi.merchantPayment;

const { RetrieveAMissingResponse } = require('./retrieveAMissingResponse.test')

const link = async () => {
  const request = new LinkRequest();
  const { data: { link } } = await RetrieveAMissingResponse();
  request.link(link);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve Representation Of The Missing Resource Request', () => {
  it('should return a response object containing a link to the missing resource', async () => {
    const response = await link();

    expect(response.status).toBe(200);
  });
});


require('../test_helper');

const client = require('../test_harness').client();

const { LinkRequest } = mobileMoneyApi.common;

const { retrieveAMissingResponse } = require('./retrieveAMissingResponse.test')

const link = async () => {
  const { data: { link } } = await retrieveAMissingResponse();
  const request = new LinkRequest(link);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve Representation Of The Missing Resource Request', () => {
  it('should return a response object containing a link to the missing resource', async () => {
    const response = await link();

    expect(response.status).toBe(200);
  });
});

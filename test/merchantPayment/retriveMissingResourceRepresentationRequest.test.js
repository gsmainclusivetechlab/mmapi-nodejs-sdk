
require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveRepresentationOfTheMissingResourceRequest } = mobileMoneyApi.merchantPayment;

const { RetrieveAMissingApiResponse } = require('./retrieveAMissingResponseRequest.test')

const retrieveRepresentationOfTheMissingResourceRequest = async () => {
  const request = new RetrieveRepresentationOfTheMissingResourceRequest();
  const { data: { link } } = await RetrieveAMissingApiResponse();
  request.link(link);

  const response = await client.execute(request);

  return response;
}

describe('Retrieve Representation Of The Missing Resource Request', () => {
  it('should return a response object containing a link to the missing resource', async () => {
    const response = await retrieveRepresentationOfTheMissingResourceRequest();

    expect(response.status).toBe(200);
  });
});

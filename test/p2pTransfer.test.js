const {
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  viewRequestState
} = require('../samples/index')

describe('P2P Transfers', () => {
  describe('Perform a P2P Transfer via Switch', () => {
    describe('GET Retrieve the Name of the Recipient', () => {
      it('should return the account holder name object with status 200 to indicate that the request is pending', async () => {
        const response = await viewAccountName('walletid', '1', true);

        expect(response.status).toBe(200);
      });
    })
  });
})




const {
  createReversal,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewRequestState,
  viewTransaction,
  viewResource,
  viewAccountName,
  createQuotation,
  viewQuotation
} = require('../index').common;

const usecase1 = async () => {
  console.log("Perform a P2P Transfer via Switch...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('walletid', '1', true);
}

(async (usecase) => {
  switch (usecase) {
    case 1:
      await usecase1();
      break;
    default:
      await usecase1();
  }
})(1);
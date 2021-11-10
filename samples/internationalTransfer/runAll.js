const {
  createAIntTransferTransaction,
  createANewQuotation,
} = require('../index').internationalTransfer;

const {
  createAReversal,
  viewAccountBalance,
  viewAccountSpecificTransaction,
  checkApiAvailability,
  viewAResponse,
  viewARequestState,
  viewATransaction,
  viewAResource
} = require('../index').common;

const usecase1 = async () => {
  console.log("Perform an International Transfer...");

  console.log("POST Request a International Transfer Quotation")
  await createANewQuotation(true);

  console.log("POST Perform an International Transfer")
  await createAIntTransferTransaction('REF-1636533162268', undefined, true);
}

(async (usecase) => {
  switch (usecase) {
    case 1:
      await usecase1();
      break;
    default:
      await usecase1();
  }
})();


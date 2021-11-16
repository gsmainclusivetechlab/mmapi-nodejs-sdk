const {
  createInternationalTransaction,
  createQuotation,
} = require('../index').internationalTransfer;

const {
  createReversal,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewRequestState,
  viewTransaction,
  viewResource
} = require('../index').common;

const usecase1 = async () => {
  console.log("Perform an International Transfer...");

  console.log("POST Request a International Transfer Quotation")
  await createQuotation(true);

  console.log("POST Perform an International Transfer")
  await createInternationalTransaction('REF-1636533162268', undefined, true);
}

const usecase2 = async () => {
  console.log("Perform an Bilateral International Transfer...");

  console.log("POST Request a International Transfer Quotation")
  await createQuotation(true);

  console.log("POST Perform an International Transfer")
  await createInternationalTransaction('REF-1636533162268', undefined, true);
}

const usecase3 = async () => {
  console.log("Perform a International Transfer Reversal...");

  console.log("POST Perform an International Transfer")
  const { data: { serverCorrelationId } } = await createInternationalTransaction('REF-1636533162268', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Perform a Merchant Payment Reversal')
  await createReversal(objectReference, true);
}

const usecase4 = async () => {
  console.log("Obtain a Financial Service Provider Balance...");

  console.log('GET Get an Account Balance')
  await viewAccountBalance('accountid', '2000', true);
}

const usecase5 = async () => {
  console.log("Retrieve Transactions for a Financial Service Provider...");

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('accountid', '2000', 0, 20);
}

const usecase6 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase7 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform an International Transfer');
  const { config: { headers } } = await createInternationalTransaction('REF-1636533162268', undefined, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource(link, true);
}

(async (usecase) => {
  switch (usecase) {
    case 1:
      await usecase1();
      break;
    case 2:
      await usecase2();
      break;
    case 3:
      await usecase3();
      break;
    case 4:
      await usecase4();
      break;
    case 5:
      await usecase5();
      break;
    case 6:
      await usecase6();
      break;
    case 7:
      await usecase7();
      break;
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
      await usecase6();
      await usecase7();
      break;
  }
})();


const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  createTransferTransaction2,
  createReversal,
  viewAccountTransactions,
  viewQuotation,
  viewRequestState,
  viewTransaction
} = require('./index')

const usecase1 = async () => {
  console.log("Perform a P2P Transfer via Switch...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName(true);

  console.log("POST Request a P2P Quotation");
  await createQuotation(true, true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction('REF-1637249499739', true, true);
}

const usecase2 = async () => {
  console.log("POST Perform a P2P Transfer Using the Polling Method...");

  console.log('POST Perform a P2P Transfer')
  const { data: { serverCorrelationId } } = await createTransferTransaction('REF-1637249499739', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase3 = async () => {
  console.log("Perform a Bilateral P2P Transfer...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName(true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction2(true, true);
}

const usecase4 = async () => {
  console.log("Perform an ‘On-us’ P2P Transfer Initiated by a Third Party Provider...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName(true);

  console.log("POST Request a P2P Quotation");
  await createQuotation(true, true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction('REF-1637249499739', true, true);
}

const usecase5 = async () => {
  console.log("Perform a Transaction Reversal...")

  console.log("POST Perform a P2P Transfer");
  const { data: { serverCorrelationId } } = await createTransferTransaction('REF-1637249499739', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal(objectReference, true, true);
}

const usecase6 = async () => {
  console.log("Obtain an FSP Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance(true);
}

const usecase7 = async () => {
  console.log("Retrieve Transactions for an FSP...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions(true);
}

const usecase8 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase9 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform a P2P Transfer');
  const { config: { headers } } = await createTransferTransaction('REF-1637249499739', true, true);

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
    case 8:
      await usecase8();
      break;
    case 9:
      await usecase9();
      break;
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
      await usecase6();
      await usecase7();
      await usecase8();
      await usecase9();
  }
})();
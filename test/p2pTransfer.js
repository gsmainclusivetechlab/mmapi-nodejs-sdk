const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  createReversal,
  viewAccountTransactions,
  viewRequestState,
  viewTransaction,

  createTransferTransactionRequestBody
} = require('../samples/index')

const usecase1 = async () => {
  console.log("Perform a P2P Transfer via Switch...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('p2pTransfer', undefined, true);

  console.log("POST Request a P2P Quotation");
  await createQuotation('p2pTransfer', undefined, undefined, true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction(createTransferTransactionRequestBody['p2pTransfer']('REF-1637249499739'), 'p2pTransfer', undefined, true);
}

const usecase2 = async () => {
  console.log("POST Perform a P2P Transfer Using the Polling Method...");

  console.log('POST Perform a P2P Transfer')
  const { data: { serverCorrelationId } } = await createTransferTransaction(createTransferTransactionRequestBody['p2pTransfer']('REF-1637249499739'), 'p2pTransfer', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('p2pTransfer', serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, 'p2pTransfer', true);
}

const usecase3 = async () => {
  console.log("Perform a Bilateral P2P Transfer...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('p2pTransfer', undefined, true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction(createTransferTransactionRequestBody['p2pTransferBilateral'](), 'p2pTransfer', undefined, true);
}

const usecase4 = async () => {
  console.log("Perform an ‘On-us’ P2P Transfer Initiated by a Third Party Provider...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('p2pTransfer', undefined, true);

  console.log("POST Request a P2P Quotation");
  await createQuotation('p2pTransfer', undefined, undefined, true);

  console.log("POST Perform a P2P Transfer");
  await createTransferTransaction(createTransferTransactionRequestBody['p2pTransfer']('REF-1637249499739'), 'p2pTransfer', undefined, true);
}

const usecase5 = async () => {
  console.log("Perform a Transaction Reversal...")

  console.log("POST Perform a P2P Transfer");
  const { data: { serverCorrelationId } } = await createTransferTransaction(createTransferTransactionRequestBody['p2pTransfer']('REF-1637249499739'), 'p2pTransfer', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('p2pTransfer', serverCorrelationId, true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal('p2pTransfer', objectReference, undefined, undefined, true);
}

const usecase6 = async () => {
  console.log("Obtain an FSP Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance('p2pTransfer', undefined, true);
}

const usecase7 = async () => {
  console.log("Retrieve Transactions for an FSP...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('p2pTransfer', undefined, undefined, undefined, true);
}

const usecase8 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability('p2pTransfer', true);
}

const usecase9 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform a P2P Transfer');
  const { config: { headers } } = await createTransferTransaction(createTransferTransactionRequestBody['p2pTransfer']('REF-1637249499739'), 'p2pTransfer', undefined, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], 'p2pTransfer', true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource(link, 'p2pTransfer', true);
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
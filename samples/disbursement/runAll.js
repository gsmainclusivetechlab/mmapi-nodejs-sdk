const {
  createADisbursementTransaction,
  createATransactionBatch,
  updateATransactionBatch,
  viewTransactionBatch,
  viewBatchCompletions,
  viewBatchRejections
} = require('../index').disbursement;

const {
  createAReversal,
  viewAccountBalance,
  viewAccountSpecificTransaction,
  viewServiceAvailability,
  viewResponse,
  viewRequestState,
  viewTransaction,
  viewAResource
} = require('../index').common;

const usecase1 = async () => {
  console.log("Perform an Individual Disbursement...");

  console.log("POST Perform an Individual Disbursement")
  await createADisbursementTransaction(false, true);
}

const usecase2 = async () => {
  console.log("Perform a Bulk Disbursement...")

  console.log('POST Perform a Bulk Disbursement')
  await createATransactionBatch(true);

  let batchId = "REF-1636656115835"

  console.log('GET View A Transaction Batch')
  await viewTransactionBatch(batchId, true);

  console.log('GET Retrieve Batch Transactions that have Completed')
  await viewBatchCompletions(batchId, true);

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);
}

const usecase3 = async () => {
  console.log("Perform a Bulk Disbursement with Maker / Checker...")

  console.log('POST Perform a Bulk Disbursement')
  await createATransactionBatch(true);

  let batchId = "REF-1636656115835"

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);

  console.log('PATCH Approve The Transaction Batch')
  await updateATransactionBatch(batchId, true);

  console.log('GET View A Transaction Batch')
  await viewTransactionBatch(batchId, true);

  console.log('GET Retrieve Batch Transactions that have Completed')
  await viewBatchCompletions(batchId, true);

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);
}

const usecase4 = async () => {
  console.log("Perform an Individual Disbursement Using the Polling Method...")

  console.log('POST Perform an Individual Disbursement')
  const { data: { serverCorrelationId } } = await createADisbursementTransaction(true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase5 = async () => {
  console.log("Perform a Transaction Reversal...")

  console.log('POST Perform an Individual Disbursement')
  const { data: { serverCorrelationId } } = await createADisbursementTransaction(false, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('POST Perform a Transaction Reversal')
  await createAReversal(objectReference, true);
}

const usecase6 = async () => {
  console.log("Obtain a Disbursement Organisation Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance('accountid', '2000', true);
}

const usecase7 = async () => {
  console.log("Retrieve Transactions for a Disbursement Organisation...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountSpecificTransaction('accountid', '2000', 0, 2, true);
}

const usecase8 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase9 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform an Individual Disbursement');
  const { config: { headers } } = await createADisbursementTransaction(false, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], true);

  console.log('GET Retrieve a Missing Resource');
  await viewAResource(link, true);
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
})(3);


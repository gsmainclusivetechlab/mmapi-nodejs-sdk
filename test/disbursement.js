const {
  createDisbursementTransaction,
  createBatchTransaction,
  updateBatchTransaction,
  viewBatchTransaction,
  viewBatchCompletions,
  viewBatchRejections,
  createReversal,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewRequestState,
  viewTransaction,
  viewResource
} = require('../samples/index')

const usecase1 = async () => {
  console.log("Perform an Individual Disbursement...");

  console.log("POST Perform an Individual Disbursement")
  await createDisbursementTransaction(undefined, true);
}

const usecase2 = async () => {
  console.log("Perform a Bulk Disbursement...")

  console.log('POST Perform a Bulk Disbursement')
  await createBatchTransaction(undefined, true);

  let batchId = "REF-1636656115835";

  console.log('GET View A Transaction Batch')
  await viewBatchTransaction(batchId, true);

  console.log('GET Retrieve Batch Transactions that have Completed')
  await viewBatchCompletions(batchId, true);

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);
}

const usecase3 = async () => {
  console.log("Perform a Bulk Disbursement with Maker / Checker...")

  console.log('POST Perform a Bulk Disbursement')
  await createBatchTransaction(undefined, true);

  let batchId = "REF-1636656115835";

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);

  console.log('PATCH Approve The Transaction Batch')
  await updateBatchTransaction(batchId, undefined, true);

  console.log('GET View A Transaction Batch')
  await viewBatchTransaction(batchId, true);

  console.log('GET Retrieve Batch Transactions that have Completed')
  await viewBatchCompletions(batchId, true);

  console.log('GET Retrieve Batch Transactions that have been Rejected')
  await viewBatchRejections(batchId, true);
}

const usecase4 = async () => {
  console.log("Perform an Individual Disbursement Using the Polling Method...")

  console.log('POST Perform an Individual Disbursement')
  const { data: { serverCorrelationId } } = await createDisbursementTransaction(true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase5 = async () => {
  console.log("Perform a Bulk Disbursement Using the Polling Method...")

  console.log('POST Perform a Bulk Disbursement')
  const { data: { serverCorrelationId } } = await createBatchTransaction(true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Transaction Batch')
  await viewBatchTransaction(objectReference, true);
}

const usecase6 = async () => {
  console.log("Approve The Transaction Batch Using the Polling Method...")

  let batchId = "REF-1636656115835";

  console.log('PATCH Approve The Transaction Batch')
  const { data: { serverCorrelationId } } = await updateBatchTransaction(batchId, true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Transaction Batch')
  await viewBatchTransaction(objectReference, true);
}

const usecase7 = async () => {
  console.log("Perform a Transaction Reversal...")

  console.log('POST Perform an Individual Disbursement')
  const { data: { serverCorrelationId } } = await createDisbursementTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal(objectReference, true);
}

const usecase8 = async () => {
  console.log("Obtain a Disbursement Organisation Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance('accountid', '2000', true);
}

const usecase9 = async () => {
  console.log("Retrieve Transactions for a Disbursement Organisation...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('accountid', '2000', 0, 2, true);
}

const usecase10 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase11 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform an Individual Disbursement');
  const { config: { headers } } = await createDisbursementTransaction(undefined, true);

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
    case 10:
      await usecase10();
      break;
    case 11:
      await usecase11();
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
      await usecase10();
      await usecase11();
  }
})();


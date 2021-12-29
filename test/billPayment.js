const {
  viewAccountBills,
  createBillPayment,
  createBillTransaction,
  viewTransaction,
  viewBillPayment,
  viewRequestState,
  viewServiceAvailability,
  viewResponse,
  viewResource
} = require('../samples/index');

const usecase1 = async () => {
  console.log("Successful Retrieval of Bills...");

  console.log("GET Retrieve a Set of Bills");
  await viewAccountBills('billPayment', undefined, undefined, true);
}

const usecase2 = async () => {
  console.log("Make a Successful Bill Payment with Callback...");

  console.log(`POST Make a Bill Payment`);
  await createBillPayment('billPayment', undefined, undefined, undefined, true, true);
}

const usecase3 = async () => {
  console.log("Make a Successful Bill Transaction with Polling...");

  console.log(`POST Make a Bill Transaction Via the Polling Method`);
  const { data: { serverCorrelationId } } = await createBillTransaction('billPayment', undefined, undefined, true);

  console.log('GET Poll to Determine the Request State');
  const { data: { objectReference } } = await viewRequestState('billPayment', serverCorrelationId, true);

  console.log('GET Retrieve a Transaction');
  await viewTransaction('billPayment', objectReference, true);
}

const usecase4 = async () => {
  console.log("Make a Bill Payment with Polling...");

  console.log(`POST Make a Bill Payment Via the Polling Method`);
  const { data: { serverCorrelationId } } = await createBillPayment('billPayment', undefined, undefined, undefined, undefined, true);

  console.log('GET Poll to Determine the Request State');
  const { data: { objectReference } } = await viewRequestState('billPayment', serverCorrelationId, true);

  console.log('GET Retrieve Bill Payments for a Given Bill');
  await viewBillPayment('billPayment', undefined, objectReference, undefined, true);
}

const usecase5 = async () => {
  console.log("Retrieval of Bill Payments...");

  console.log(`GET Retrieve a Set of Bill Payments`);
  await viewBillPayment('billPayment', undefined, undefined, { offset: 0, limit: 20 }, true);
}

const usecase6 = async () => {
  console.log("Check for Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability('billPayment', true);
}

const usecase7 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log(`POST Make a Bill Payment`);
  const { config: { headers } } = await createBillPayment('billPayment', undefined, undefined, undefined, true, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse('billPayment', headers['X-CorrelationID'], true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource('billPayment', link, true);
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
  }
})();
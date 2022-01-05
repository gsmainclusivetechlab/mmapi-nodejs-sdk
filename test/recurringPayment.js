const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createAccountDebitMandate,
  createMerchantTransaction,
  viewRequestState,
  viewTransaction,
  createRefundTransaction,
  createReversal,
  viewAccountDebitMandate,
  viewAccountTransactions
} = require('../samples/index')

const usecase1 = async () => {
  console.log("Setup a Recurring Payment...");

  console.log("POST Setup a Recurring Payment");
  await createAccountDebitMandate('recurringPayment', undefined, undefined, true, true);
}

const usecase2 = async () => {
  console.log("Setup a Recurring Payment using the Polling Method...");

  console.log("POST Setup a Recurring Payment");
  const { data: { serverCorrelationId } } = await createAccountDebitMandate('recurringPayment', undefined, undefined, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('recurringPayment', serverCorrelationId, true);

  console.log('GET View A Debit Mandate')
  await viewAccountDebitMandate('recurringPayment', objectReference, undefined, true);
}

const usecase3 = async () => {
  console.log("Take a Recurring Payment...");

  console.log("POST Setup a Recurring Payment");
  const { data: { serverCorrelationId } } = await createAccountDebitMandate('recurringPayment', undefined, undefined, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('recurringPayment', serverCorrelationId, true);

  console.log('GET View A Debit Mandate')
  const { data: { mandateReference } } = await viewAccountDebitMandate('recurringPayment', objectReference, undefined, true);

  console.log("POST Take a Recurring Payment");
  await createMerchantTransaction('recurringPayment', 'mandatereference', mandateReference, true, true);
}

const usecase4 = async () => {
  console.log("Take a Recurring Payment using the Polling Method ...");

  console.log("POST Take a Recurring Payment");
  const { data: { serverCorrelationId } } = await createMerchantTransaction('recurringPayment', 'mandatereference', 'REF-1637670547701', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('recurringPayment', serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction('recurringPayment', objectReference, true);
}

const usecase5 = async () => {
  console.log("Recurring Payment Refund ...");

  console.log("POST Perform a Recurring Payment Refund");
  await createRefundTransaction('recurringPayment', 'mandatereference', 'REF-1637670547701', true, true);
}

const usecase6 = async () => {
  console.log("Recurring Payment Reversal ...");

  console.log('POST Take a Recurring Payment')
  const { data: { serverCorrelationId } } = await createMerchantTransaction('recurringPayment', 'mandatereference', 'REF-1637670547701', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('recurringPayment', serverCorrelationId, true);

  console.log('POST Perform a Merchant Payment Reversal')
  await createReversal('recurringPayment', objectReference, undefined, true, true);
}

const usecase7 = async () => {
  console.log("Payer sets up a Recurring Payment using MMP Channel ...");

  console.log("POST Setup a Recurring Payment");
  const { data: { serverCorrelationId } } = await createAccountDebitMandate('recurringPayment', undefined, undefined, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState('recurringPayment', serverCorrelationId, true);

  console.log('GET View A Debit Mandate')
  await viewAccountDebitMandate('recurringPayment', objectReference, undefined, true);
}

const usecase8 = async () => {
  console.log("Obtain a Service Provider Balance ...");

  console.log('GET Get an Account Balance')
  await viewAccountBalance('recurringPayment', undefined, true);
}

const usecase9 = async () => {
  console.log("Retrieve Payments for a Service Provider ...");

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('recurringPayment', undefined, undefined, undefined, true);
}

const usecase10 = async () => {
  console.log("Check for Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability('recurringPayment', true);
}

const usecase11 = async () => {
  console.log("Retrieve a Missing API Response ...")

  console.log('POST Take a Recurring Payment')
  const { config: { headers } } = await createMerchantTransaction('recurringPayment', 'mandatereference', 'REF-1637670547701', true, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse('recurringPayment', headers['X-CorrelationID'], true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource('recurringPayment', link, true);
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
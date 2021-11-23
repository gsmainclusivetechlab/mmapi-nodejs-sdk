const {
  createAccountDebitMandate,
  viewAccountDebitMandate,
  viewRequestState,
  createMerchantTransaction,
  viewTransaction,
  createRefundTransaction
} = require('../samples/index')

const buildAccountDebitMandateRequestBody = () => ({
  "payee": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestDate": "2018-07-03T10:43:27.405Z",
  "startDate": "2018-07-03T10:43:27.405Z",
  "currency": "GBP",
  "amountLimit": "1000.00",
  "endDate": "2028-07-03T10:43:27.405Z",
  "numberOfPayments": "2",
  "frequencyType": "sixmonths",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ]
});

const buildMerchantTransactionRequestBody = (mandateReference) => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "mandatereference",
      "value": `${mandateReference}`
    }
  ],
  "creditParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "currency": "RWF"
});

const buildRefundTransactionRequestBody = (mandateReference) => ({
  "amount": "200.00",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "creditParty": [
    {
      "key": "mandateReference",
      "value": `${mandateReference}`
    }
  ],
  "currency": "RWF"
});

const usecase1 = async () => {
  console.log("Setup a Recurring Payment...");

  console.log("POST Setup a Recurring Payment");
  await createAccountDebitMandate(buildAccountDebitMandateRequestBody(), 'accountid', '2000', 'recurringPayment', undefined, true);
}

const usecase2 = async () => {
  console.log("Setup a Recurring Payment using the Polling Method...");

  console.log("POST Setup a Recurring Payment");
  const { data: { serverCorrelationId } } = await createAccountDebitMandate(buildAccountDebitMandateRequestBody(), 'accountid', '2000', 'recurringPayment', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Debit Mandate')
  await viewAccountDebitMandate('accountid', '2000', objectReference, 'recurringPayment', true);
}

const usecase3 = async () => {
  console.log("Take a Recurring Payment...");

  console.log("POST Setup a Recurring Payment");
  const { data: { serverCorrelationId } } = await createAccountDebitMandate(buildAccountDebitMandateRequestBody(), 'accountid', '2000', 'recurringPayment', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Debit Mandate')
  const { data: { mandateReference } } = await viewAccountDebitMandate('accountid', '2000', objectReference, 'recurringPayment', true);

  console.log("POST Take a Recurring Payment");
  await createMerchantTransaction(buildMerchantTransactionRequestBody(mandateReference), 'recurringPayment', undefined, true);
}

const usecase4 = async () => {
  console.log("Take a Recurring Payment using the Polling Method ...");

  console.log("POST Take a Recurring Payment");
  const { data: { serverCorrelationId } } = await createMerchantTransaction(buildMerchantTransactionRequestBody('REF-1637670547701'), 'recurringPayment', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase5 = async () => {
  console.log("Recurring Payment Refund ...");

  console.log("POST Perform a Recurring Payment Refund");
  await createRefundTransaction(buildRefundTransactionRequestBody('REF-1637670547701'), 'recurringPayment', undefined, true);
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
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
  }
})(5);
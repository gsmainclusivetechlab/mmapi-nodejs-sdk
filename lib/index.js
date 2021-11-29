const core = require('./core/index');

const {
  createAuthorisationCode,
  viewAccountBalance,
  viewAccountName,
  viewAccountTransactions,
  viewAuthorisationCode
} = require('./accounts/index');

const {
  createQuotation,
  viewQuotation
} = require('./quotations/index');

const {
  viewRequestState,
  viewResource,
  viewResponse,
  viewServiceAvailability,
} = require('./supporting/index');

const {
  createBatchTransaction,
  createDisbursementTransaction,
  createInternationalTransaction,
  createMerchantTransaction,
  createRefundTransaction,
  createReversal,
  createTransferTransaction,
  updateBatchTransaction,
  viewBatchCompletions,
  viewBatchRejections,
  viewBatchTransaction,
  viewTransaction,
} = require('./transactions/index');

const {
  createAccountDebitMandate,
  viewAccountDebitMandate
} = require('./debitMandates/index');

module.exports = {
  core,
  merchantPayment: {
    viewAccountBalance,
    viewServiceAvailability,
    viewResponse,
    viewResource,
    createMerchantTransaction,
    viewRequestState,
    viewTransaction,
    createAuthorisationCode,
    createRefundTransaction,
    createReversal,
    viewAccountTransactions,
    viewAuthorisationCode,
  },
  disbursement: {
    viewAccountBalance,
    viewServiceAvailability,
    viewResponse,
    viewResource,
    createDisbursementTransaction,
    createBatchTransaction,
    viewBatchTransaction,
    viewBatchCompletions,
    viewBatchRejections,
    updateBatchTransaction,
    viewRequestState,
    viewTransaction,
    createReversal,
    viewAccountTransactions,
  },
  internationalTransfer: {
    viewAccountBalance,
    viewServiceAvailability,
    viewResponse,
    viewResource,
    createQuotation,
    createInternationalTransaction,
    createReversal,
    viewAccountTransactions,
    viewQuotation,
    viewRequestState,
    viewTransaction
  },
  p2pTransfer: {
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
    viewTransaction
  },
  recurringPayment: {
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
  }
};

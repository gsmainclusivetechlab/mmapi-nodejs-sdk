const core = require('./core/index');

const {
  viewAccountBalance,
  viewAccountName,
  viewAccountTransactions,
} = require('./accounts/index');

const {
  createAuthorisationCode,
  viewAuthorisationCode
} = require('./authorisationCodes/index');

const {
  createBatchTransaction,
  updateBatchTransaction,
  viewBatchTransaction,
  viewBatchCompletions,
  viewBatchRejections,
} = require('./batchTransactions/index');

const {
  createAccountDebitMandate,
  viewAccountDebitMandate
} = require('./debitMandates/index');

const {
  createAccountLink,
  viewAccountLink
} = require('./links/index');

const {
  createQuotation,
  viewQuotation
} = require('./quotations/index');

const {
  createReversal
} = require('./reversals/index');

const {
  viewRequestState,
  viewResource,
  viewResponse,
  viewServiceAvailability,
} = require('./supporting/index');

const {
  createDisbursementTransaction,
  createInternationalTransaction,
  createMerchantTransaction,
  createRefundTransaction,
  createTransferTransaction,
  viewTransaction,
} = require('./transactions/index');

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
    viewQuotation,
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
  },
  accountLinking: {
    viewAccountBalance,
    viewServiceAvailability,
    viewResponse,
    viewResource,
    createAccountLink,
    createTransferTransaction,
    viewRequestState,
    viewTransaction,
    createReversal,
    viewAccountTransactions,
    viewAccountLink
  }
};

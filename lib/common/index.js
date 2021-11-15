const { ViewServiceAvailability } = require('./viewServiceAvailability');
const { ViewResponse } = require('./viewResponse');
const { ViewRequestState } = require('./viewRequestState');
const { ViewTransaction } = require('./viewTransaction');
const { ViewAccountBalance } = require('./viewAccountBalance');
const { CreateReversal } = require('./createReversal');
const { ViewAccountTransaction } = require('./viewAccountTransaction');
const { ViewResource } = require('./viewResource');

module.exports = {
  viewServiceAvailability: ViewServiceAvailability,
  viewResponse: ViewResponse,
  viewRequestState: ViewRequestState,
  viewTransaction: ViewTransaction,
  viewAccountBalance: ViewAccountBalance,
  createReversal: CreateReversal,
  viewAccountTransaction: ViewAccountTransaction,
  viewResource: ViewResource
}
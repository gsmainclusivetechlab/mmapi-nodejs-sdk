const { ViewServiceAvailability } = require('./viewServiceAvailability');
const { ViewResponse } = require('./viewResponse');
const { ViewARequestStateRequest } = require('./viewARequestStateRequest');
const { ViewATransactionRequest } = require('./viewATransactionRequest');
const { ViewAccountBalance } = require('./viewAccountBalance');
const { CreateAReversalRequest } = require('./createAReversalRequest');
const { ViewAccountSpecificTransactionRequest } = require('./viewAccountSpecificTransactionRequest');
const { ViewAResourceRequest } = require('./viewAResourceRequest');

module.exports = {
  viewServiceAvailability: ViewServiceAvailability,
  viewResponse: ViewResponse,
  ViewARequestStateRequest,
  ViewATransactionRequest,
  viewAccountBalance: ViewAccountBalance,
  CreateAReversalRequest,
  ViewAccountSpecificTransactionRequest,
  ViewAResourceRequest
}
const { PerformAnIndividualDisbursementRequest } = require('./performAnIndividualDisbursementRequest');
const { PerformABulkDisbursementRequest } = require('./performABulkDisbursementRequest');
const { RetrieveBatchTransactionsThatHaveCompletedRequest } = require('./retrieveBatchTransactionsThatHaveCompletedRequest');
const { RetrieveBatchTransactionsThatHaveBeenRejectedRequest } = require('./retrieveBatchTransactionsThatHaveBeenRejectedRequest');
const { PerformAnIndividualDisbursementUsingPollingRequest } = require('./performAnIndividualDisbursementUsingPollingRequest')

module.exports = {
  PerformAnIndividualDisbursementRequest: PerformAnIndividualDisbursementRequest,
  PerformABulkDisbursementRequest: PerformABulkDisbursementRequest,
  RetrieveBatchTransactionsThatHaveCompletedRequest: RetrieveBatchTransactionsThatHaveCompletedRequest,
  RetrieveBatchTransactionsThatHaveBeenRejectedRequest: RetrieveBatchTransactionsThatHaveBeenRejectedRequest,
  PerformAnIndividualDisbursementUsingPollingRequest: PerformAnIndividualDisbursementUsingPollingRequest
};
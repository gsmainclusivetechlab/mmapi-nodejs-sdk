const { ViewRequestState } = require('./viewRequestState');
const { ViewResource } = require('./viewResource');
const { ViewResponse } = require('./viewResponse');
const { ViewServiceAvailability } = require('./viewServiceAvailability');

module.exports = {
  viewRequestState: ViewRequestState,
  viewResource: ViewResource,
  viewResponse: ViewResponse,
  viewServiceAvailability: ViewServiceAvailability,
}
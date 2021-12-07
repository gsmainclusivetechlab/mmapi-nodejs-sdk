/**
 * Batch Transaction Object Definition
 */
class BatchTransaction {
  constructor() {
    this.data = {}
  }

  batchStatus(batchStatus) {
    this.data['batchStatus'] = batchStatus;
    return this;
  }

  transactions(transactions) {
    this.data['transactions'] = transactions;
    return this;
  }

  batchTitle(batchTitle) {
    this.data['batchTitle'] = batchTitle;
    return this;
  }

  batchDescription(batchDescription) {
    this.data['batchDescription'] = batchDescription;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
    return this;
  }

  scheduledStartDate(scheduledStartDate) {
    this.data['scheduledStartDate'] = scheduledStartDate;
    return this;
  }

  requestDate(requestDate) {
    this.data['requestDate'] = requestDate;
    return this;
  }

  customData(customData) {
    this.data['customData'] = customData;
    return this;
  }
}

module.exports = { BatchTransaction };

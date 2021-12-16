/**
 * Link Object Definition
 */
class Link {
  constructor() {
    this.data = {}
  }

  sourceAccountIdentifiers(sourceAccountIdentifiers) {
    this.data['sourceAccountIdentifiers'] = sourceAccountIdentifiers;
    return this;
  }

  mode(mode) {
    this.data['mode'] = mode;
    return this;
  }

  status(status) {
    this.data['status'] = status;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
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

module.exports = { Link };

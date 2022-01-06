/**
 * Account Object Definition
 */
class Account {
  constructor() {
    this.data = {}
  }

  accountIdentifiers(accountIdentifiers) {
    this.data['accountIdentifiers'] = accountIdentifiers;
    return this;
  }

  identity(identity) {
    this.data['identity'] = identity;
    return this;
  }

  accountType(accountType) {
    this.data['accountType'] = accountType;
    return this;
  }

  customData(customData) {
    this.data['customData'] = customData;
    return this;
  }

  fees(fees) {
    this.data['fees'] = fees;
    return this;
  }

  registeringEntity(registeringEntity) {
    this.data['registeringEntity'] = registeringEntity;
    return this;
  }

  requestDate(requestDate) {
    this.data['requestDate'] = requestDate;
    return this;
  }
}

module.exports = { Account };

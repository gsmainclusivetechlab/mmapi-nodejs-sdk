/**
 * Account Identifier Object Definition
 */
class AccountIdentifier {
  constructor() { }

  /**
   * Identifying a Target Account
   */
  identifyAccount(accountIdentifiers) {
    const accountIdentifierCount = Object.keys(accountIdentifiers).length;

    /**
     * Two methods are provided for identifying an account, the single identifier method, and the multiple identifiers method.
     * Single - The path uses a ‘’ delimiter to separate the identifier. Each key / value is delimited by ‘/’.
     * Multiple - The path uses a ‘$’ delimiter to separate each identifier, up to a limit of three account identifiers. Each key / value is delimited by ‘@’.
     */
    const keyValueDelimiter = accountIdentifierCount === 1 ? '/' : '@';
    const keyValuePairDelimiter = accountIdentifierCount === 1 ? '' : '$';

    return Object.entries(accountIdentifiers).map(accountIdentifier => accountIdentifier.join(`${keyValueDelimiter}`)).join(`${keyValuePairDelimiter}`)
  }
}

module.exports = { AccountIdentifier };

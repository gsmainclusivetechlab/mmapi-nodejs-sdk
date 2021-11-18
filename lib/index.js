const core = require('./core/index');
const common = require('./common');
const merchantPayment = require('./merchantPayment');
const disbursement = require('./disbursement');
const internationalTransfer = require('./internationalTransfer');
// const p2pTransfer = require('./p2pTransfer');

console.log('common', common)
console.log('merchantPayment', merchantPayment)
console.log('disbursement', disbursement)
console.log('internationalTransfer', internationalTransfer)

module.exports = {
  core,
  common,
  merchantPayment,
  disbursement,
  internationalTransfer,
  // p2pTransfer
};

const core = require('./core/index');
const common = require('./common/index')
const merchantPayment = require('./merchantPayment/index');
const disbursement = require('./disbursement/index');
module.exports = {
  core,
  common,
  merchantPayment,
  disbursement
};

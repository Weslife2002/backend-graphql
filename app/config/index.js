const mongo = require('./mongo');
const session = require('./session');
const others = require('./others');
const email = require('./email');
const google = require('./google');
const facebook = require('./facebook');
const userAccount = require('./userAccount');

module.exports = {
  ...email,
  ...mongo,
  ...session,
  ...others,
  ...google,
  ...facebook,
  ...userAccount,
};

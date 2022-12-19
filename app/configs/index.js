const mongoDB = require('./mongoDB');
const session = require('./session');
const others = require('./others');
const email = require('./email');
const google = require('./google');
const facebook = require('./facebook');

module.exports = {
  ...email,
  ...mongoDB,
  ...session,
  ...others,
  ...google,
  ...facebook,
};

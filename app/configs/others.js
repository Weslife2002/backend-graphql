require('dotenv').config();

module.exports = {
  resetPasswordTokenTimeOut: Number(process.env.RESET_PASSWORD_TOKEN_TIME_OUT),
};

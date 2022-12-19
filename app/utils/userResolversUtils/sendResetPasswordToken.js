const cryptoRandomString = require('crypto-random-string');
const redisClient = require('../redisUtils/redisClient');
const sendEmail = require('../otherUtils/sendEmail');
const { resetPasswordTokenTimeOut } = require('../../configs');

function sendResetPasswordToken(email) {
  const token = cryptoRandomString({ length: 32, type: 'url-safe' });
  redisClient.set(token, email);
  redisClient.pexpire(token, resetPasswordTokenTimeOut);
  sendEmail(
    email,
    '[URL-SHORTENER] Password Reset Request',
    `This is the link to your email request: http://localhost:8081/user/reset-password/${token}`,
  );
}

module.exports = sendResetPasswordToken;

const redisClient = require('./redisClient');
const config = require('../../../config');

module.exports = async (token, role) => {
  redisClient.set(token, role);
  redisClient.pexpire(token, config.session.sessionTimeOut);
};

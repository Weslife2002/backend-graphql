const hash = require('../general/hash');
const redisClient = require('../redis/redisClient');
const config = require('../../../config');

module.exports = async (username, token, userAgent, cachedData = {}) => {
  const loginTime = Date.now();
  const device = {
    deviceId: hash(`${loginTime}${Math.floor(Math.random() * 2 ** 32)}`),
    description: `${userAgent.browser.name} ${userAgent.browser.version} on ${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`,
  };
  await Promise.all([redisClient.set(token, JSON.stringify({
    ...cachedData,
    device,
    loginTime,
  })), redisClient.lpush(username, token)]);
  redisClient.pexpire(token, config.session.sessionTimeOut);
  redisClient.pexpire(username, config.session.sessionTimeOut);
};

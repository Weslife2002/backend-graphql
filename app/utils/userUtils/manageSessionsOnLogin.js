const UAParser = require('ua-parser-js');
const hash = require('../otherUtils/hash');
const redisClient = require('../redisUtils/redisClient');
const { sessionTimeOut } = require('../../configs');

function manageSessionsOnLogin(req, user) {
  const { email } = user;
  req.session.user = user;
  redisClient.lpush(`${email}`, `sess:${req.session.id}`);
  redisClient.pexpire(`${email}`, sessionTimeOut);
  const userAgent = UAParser(req.headers['user-agent']);
  req.session.loginTime = Date.now();
  req.session.device = {
    deviceId: hash(req.session.loginTime + req.ip + Math.floor(Math.random() * 4294967296)),
    description: `${userAgent.browser.name} ${userAgent.browser.version} on ${userAgent.os.name} ${userAgent.os.version} ${userAgent.cpu.architecture}`,
  };
}

module.exports = manageSessionsOnLogin;

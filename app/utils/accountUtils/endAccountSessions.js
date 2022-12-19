const redisClient = require('../redisUtils/redisClient');

async function endAccountSessions(email) {
  const sessionIds = await redisClient.lrange(`${email}`, 0, -1);
  if (sessionIds) {
    sessionIds.forEach(sessionId => {
      redisClient.del(sessionId);
    });
  }
  redisClient.del(`${email}`);
}

module.exports = endAccountSessions;

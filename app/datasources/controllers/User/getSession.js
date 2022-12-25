const redisClient = require('../../utils/redis/redisClient');

module.exports = async token => {
  const session = await redisClient.get(token);
  return session;
};

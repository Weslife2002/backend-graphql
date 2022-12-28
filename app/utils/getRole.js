const redisClient = require('./redisClient');

module.exports = async token => {
  if (!token) {
    return 'Guest';
  }
  return redisClient.get(token);
};

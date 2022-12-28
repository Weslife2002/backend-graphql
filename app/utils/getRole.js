const redisClient = require('./redisClient');

module.exports = async token => {
  if (!token) {
    return 'Guest';
  }
  const rawData = await redisClient.get(token);
  return rawData ? JSON.parse(rawData).role : 'Guest';
};

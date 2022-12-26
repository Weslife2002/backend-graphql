const redisClient = require('../../utils/redis/redisClient');
const { User } = require('../../models');

module.exports = async token => {
  const rawData = await redisClient.get(token);
  const user = await User.findOne({ username: JSON.parse(rawData).username });
  return user;
};

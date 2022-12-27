const redisClient = require('../../utils/redis/redisClient');
const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async (token, info) => {
  const rawData = await redisClient.get(token);
  const user = await User.findOne({
    _id: JSON.parse(rawData).id,
  }).select(getSelectedFields(info, { lastOnly: true }));
  return user;
};

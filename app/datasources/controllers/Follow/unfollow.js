const { Follow } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (followee, token) => {
  await Follow.deleteOne({ followee, follower: await getUserId(token) });
};

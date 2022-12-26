const { Follow } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (followee, token) => {
  await Follow.insertMany([{ followee, follower: await getUserId(token) }]);
};

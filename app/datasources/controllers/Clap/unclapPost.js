const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (postId, token) => {
  const user = await getUserId(token);
  return Clap.deleteOne({ user, post: postId });
};

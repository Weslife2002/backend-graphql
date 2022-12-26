const getUserId = require('../../utils/redis/getUserId');
const { Post } = require('../../models');

module.exports = async (_id, token) => {
  const owner = await getUserId(token);
  return Post.updateOne({ _id, owner }, { status: 'hidden' });
};

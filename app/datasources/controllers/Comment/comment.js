const { Comment } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (input, token) => {
  const { postId: post } = input;
  const user = await getUserId(token);
  return Comment.create({ ...input, post, user });
};

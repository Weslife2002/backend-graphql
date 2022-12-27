const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async ({ postId, commentId, title, content }, token) => {
  const comment = await Comment.findOne({ post: postId, comment: commentId });
  if (!comment) {
    throw GraphQLError('The post doesn\'t contain the parent comment');
  }
  const user = await getUserId(token);
  return Comment.create({ post: postId, parent: commentId, user, title, content });
};

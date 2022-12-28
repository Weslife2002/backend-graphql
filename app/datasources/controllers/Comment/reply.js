const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

module.exports = async ({ postId, commentId, title, content }, token) => {
  const comment = await Comment.findOne(removeUndefinedValue({
    post: postId, comment: commentId,
  }));
  if (!comment) {
    throw new GraphQLError('The post doesn\'t contain the parent comment');
  }
  const user = await getUserId(token);
  return Comment.create(removeUndefinedValue({
    post: postId, parent: commentId, user, title, content,
  }));
};

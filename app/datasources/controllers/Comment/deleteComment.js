const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (_id, token, deleteCommentLoader) => {
  const user = await getUserId(token);
  return Comment.findOne({ _id, user }).then(
    result => {
      if (!result) {
        throw new GraphQLError('You cannot delete the comment you don\'t own');
      }
      return deleteCommentLoader.load(_id);
    },
  );
};

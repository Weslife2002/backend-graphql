const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (_id, token) => {
  const user = await getUserId(token);
  return Comment.deleteOne({ _id, user }).then(
    result => {
      if (!result.deletedCount) {
        throw new GraphQLError('You cannot delete the comment you don\'t own');
      }
    },
  );
};

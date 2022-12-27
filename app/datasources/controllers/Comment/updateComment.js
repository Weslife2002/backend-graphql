const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async ({ commentId, title, content }, token, info) => {
  const user = await getUserId(token);
  return Comment.updateOne({ _id: commentId, user }, { title, content }).then(
    commentInstance => {
      if (!commentInstance.matchedCount) {
        throw new GraphQLError('You cannot update the comment you don\'t own');
      }
      return Comment.findOne({ _id: commentId, user }).select(
        getSelectedFields(info, { recursive: true, lastOnly: true }),
      ).lean();
    },
  );
};

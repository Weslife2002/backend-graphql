require('../../../global');
const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

function replies(args, context, info) {
  try {
    const { input } = args;
    const { commentId, limit, offset } = input;
    const condition = removeUndefinedValue({ parent: commentId });
    const selectedFields = getSelectedFields(info, { lastOnly: true });
    return Comment.find(condition).select(selectedFields)
      .skip(offset || 0).limit(limit || 5)
      .lean();
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError(error.message);
  }
}

module.exports = {
  replies,
};

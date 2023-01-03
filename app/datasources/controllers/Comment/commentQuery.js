require('../../../global');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

function replies(args, context, info) {
  try {
    const { input } = args;
    const { commentId } = input;
    let { cursor, limit, offset } = input;
    limit = (limit === undefined || limit < 1) ? 5 : limit;
    offset = (offset === undefined || offset < 0) ? 5 : offset;
    cursor = mongoose.Types.ObjectId(cursor);
    const condition = removeUndefinedValue({ parent: commentId });
    const selectedFields = getSelectedFields(info, { lastOnly: true });
    if (!cursor) {
      return Comment.find(condition)
        .select(selectedFields).lean()
        .skip(offset)
        .limit(limit);
    }
    return Comment.find(condition, { _id: { $gt: cursor } })
      .select(selectedFields).lean()
      .limit(limit);
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError(error.message);
  }
}

module.exports = {
  replies,
};

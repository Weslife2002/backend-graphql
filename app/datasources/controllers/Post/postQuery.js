require('../../../global');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

async function findPostById(args, context, info) {
  try {
    const { id } = args;
    const selectedFields = getSelectedFields(info, { lastOnly: true });
    const post = await Post.findOne({ _id: id }).select(selectedFields).lean();
    return post;
  } catch (error) {
    logger.error(error.stack);
    throw GraphQLError('Fail to find post!');
  }
}

async function postsFilter(args, context, info) {
  try {
    const { input } = args;
    const { owner, title } = input;
    const selectedFields = getSelectedFields(info);
    let { cursor, limit, offset } = input;
    limit = (limit === undefined || limit < 1) ? 5 : limit;
    offset = (offset === undefined || offset < 0) ? 5 : offset;
    if (!cursor) {
      return Post.find(
        removeUndefinedValue({ owner, title }),
      ).select(selectedFields).lean()
        .skip(offset)
        .limit(limit);
    }
    cursor = mongoose.Types.ObjectId(cursor);
    return Post.find(
      removeUndefinedValue({ owner, title, _id: { $gt: cursor } }),
    ).select(selectedFields).lean()
      .limit(limit || 5);
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to find posts!');
  }
}

module.exports = {
  post: findPostById,
  posts: postsFilter,
};

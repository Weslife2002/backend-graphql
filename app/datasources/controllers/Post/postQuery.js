require('../../../global');
const { GraphQLError } = require('graphql');
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
    const { owner, title, limit, offset } = input;
    const selectedFields = getSelectedFields(info, { lastOnly: true });
    const posts = await Post.find(
      removeUndefinedValue({ owner, title }),
    ).select(selectedFields).skip(offset || 0).limit(limit || 5);
    return posts;
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to find posts!');
  }
}

module.exports = {
  post: findPostById,
  posts: postsFilter,
};

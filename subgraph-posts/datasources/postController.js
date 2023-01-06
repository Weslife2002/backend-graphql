const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const Post = require('./Post');
const getSelectedFields = require('./utils/general/getSelectedFields');
const removeUndefinedValue = require('./utils/general/removeUndefinedValue');

async function createPost(args, context, info) {
  try {
    const { signature } = context;
    const { _id: owner } = signature;
    const { title, content, status } = args;
    return new Post({
      title, content, status, owner,
    }).save();
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to create post!');
  }
}

async function deletePost(args, context, info) {
  try {
    const { _id } = args;
    const { signature } = context;
    const { _id: owner } = signature;
    await Post.deleteOne({ _id, owner });
    return {
      isSucess: true,
      message: 'Delete post success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSucess: false,
      message: 'Fail to delete post!',
    };
  }
}

async function hidePost(args, context, info) {
  try {
    const { _id } = args;
    const { signature } = context;
    const { _id: owner } = signature;
    await Post.updateOne({ _id, owner }, { status: 'hidden' });
    return {
      isSucess: true,
      message: 'Hide post success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSucess: false,
      message: 'Fail to hide post!',
    };
  }
}

async function updatePost(args, context, info) {
  try {
    const { input } = args;
    const { id: _id } = input;
    const { title, content, status } = input;
    const { signature } = context;
    const { _id: owner } = signature;
    const newFieldValues = removeUndefinedValue({ title, content, status });
    const selectedFields = getSelectedFields(info);
    const result = await Post.updateOne({ _id, owner }, newFieldValues);
    if (!result.matchedCount) {
      throw new GraphQLError('Unauthorized!');
    }
    return Post.findOne({ _id, owner }).select(selectedFields).lean();
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to update post!');
  }
}

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
  createPost,
  deletePost,
  hidePost,
  updatePost,
  post: findPostById,
  posts: postsFilter,
};

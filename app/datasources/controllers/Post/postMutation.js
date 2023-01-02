require('../../../global');
const { GraphQLError } = require('graphql');
const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

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

module.exports = {
  createPost,
  deletePost,
  hidePost,
  updatePost,
};

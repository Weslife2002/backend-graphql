require('../../../global');
const { GraphQLError } = require('graphql');
const { logger } = require('../../../global');
const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

async function createPost(args, context, info) {
  try {
    const { credential } = context;
    const { _id: owner } = credential;
    const { title, content, status } = args;
    return Post.create({
      title, content, status, owner,
    }).then(postInstance => postInstance.save());
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to create post!');
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

async function deletePost(args, context, info) {
  try {
    const { _id } = args;
    const { credential } = context;
    const { _id: owner } = credential;
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
    const { credential } = context;
    const { _id: owner } = credential;
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

async function postsFilter(args, context, info) {
  try {
    const { owner, title, limit, offset } = args;
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

async function updatePost(args, context, info) {
  try {
    const { input } = args;
    const { id: _id } = input;
    const { title, content, status } = input;
    const { credential } = context;
    const { _id: owner } = credential;
    const selectedFields = getSelectedFields(info);
    return (Post.updateOne(
      { _id, owner },
      removeUndefinedValue({ title, content, status }),
    ).then(
      result => {
        if (result.modifiedCount) {
          return Post.findOne({ _id, owner }).select(selectedFields).then(updatedPost => {
            if (!updatedPost) {
              throw new GraphQLError('Unauthorized!');
            }
            return updatedPost;
          });
        }
        throw new GraphQLError('Fail to update post!');
      },

    ));
  } catch (error) {
    logger.error(error.stack);
    throw new GraphQLError('Fail to update post!');
  }
}

module.exports = {
  createPost,
  deletePost,
  hidePost,
  post: findPostById,
  posts: postsFilter,
  updatePost,
};

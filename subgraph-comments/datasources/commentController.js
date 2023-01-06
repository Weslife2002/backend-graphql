require('../global');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const { Comment } = require('./models');
const getSelectedFields = require('./utils/general/getSelectedFields');
const removeUndefinedValue = require('./utils/general/removeUndefinedValue');

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

async function createComment(args, context, info) {
  try {
    const { input } = args;
    const { postId: post, title, content } = input;
    const { signature } = context;
    const { _id: user } = signature;

    const commentInfo = removeUndefinedValue({ title, content, post, user });
    return new Comment(commentInfo).save();
  } catch (error) {
    logger.error(JSON.stringify(error.stack));
    throw new GraphQLError(error.message);
  }
}

async function deleteComment(args, context, info) {
  try {
    const { _id } = args;
    const { signature } = context;
    const { _id: user } = signature;

    const result = await Comment.deleteOne({ _id, user });
    if (!result) {
      return {
        isSuccess: false,
        message: 'Unauthorized!',
      };
    }
    return {
      isSuccess: true,
      message: 'Delete comment success!',
    };
  } catch (error) {
    logger.error(JSON.stringify(error.stack));
    throw new GraphQLError(error.message);
  }
}

async function reply(args, context, info) {
  try {
    const { input } = args;
    const { postId, commentId, title, content } = input;
    const { signature } = context;
    const { _id: user } = signature;

    const parentComment = await Comment.findOne({
      post: postId, _id: commentId,
    }).select('_id').lean();
    if (!parentComment) {
      throw new GraphQLError('Unauthorized!');
    }

    const fieldValues = removeUndefinedValue({
      post: postId, parent: commentId, user, title, content,
    });
    return Comment.create(fieldValues);
  } catch (error) {
    logger.error(JSON.stringify(error.stack));
    throw new GraphQLError(error.message);
  }
}

async function updateComment(args, context, info) {
  const { input } = args;
  const { commentId, title, content } = input;
  const { signature } = context;
  const { _id: user } = signature;
  const newFieldValues = removeUndefinedValue({ title, content });

  const result = Comment.updateOne({ _id: commentId, user }, newFieldValues);
  if (!result.matchedCount) {
    throw new GraphQLError('Unauthorized!');
  }

  const selectedFields = getSelectedFields(info, { recursive: true, lastOnly: true });
  return Comment.findOne({ _id: commentId, user }).select(selectedFields).lean();
}

module.exports = {
  replies,

  comment: createComment,
  deleteComment,
  reply,
  updateComment,
};

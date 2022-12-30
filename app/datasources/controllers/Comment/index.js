const { GraphQLError } = require('graphql');
const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

function comment(args, context, info) {
  const { input } = args;
  const { postId: post } = input;
  const { credential } = context;
  const { _id: user } = credential;
  return Comment.create({ ...input, post, user });
}

function deleteComment(args, context, info) {
  const { _id } = args;
  const { credential } = context;
  const { _id: user } = credential;
  Comment.findOne({ _id, user }).then(
    result => {
      if (!result) {
        return {
          isSuccess: false,
          message: 'Fail to delete comment!',
        };
      }
      return {
        isSuccess: true,
        message: 'Delete comment success!',
      };
    },
  );
}

function replies(args, context, info) {
  const { input } = args;
  const { commentId, limit, offset } = input;
  const condition = removeUndefinedValue({ parent: commentId });
  const selectedFields = getSelectedFields(info, { lastOnly: true });
  return Comment.find(condition).select(selectedFields)
    .skip(offset || 0).limit(limit || 5)
    .lean();
}

async function reply(args, context, info) {
  const { input } = args;
  const { postId, commentId, title, content } = input;
  const { credential } = context;
  const { _id: user } = credential;
  if (!comment) {
    throw new GraphQLError('The post doesn\'t contain the parent comment');
  }
  return Comment.create(removeUndefinedValue({
    post: postId, parent: commentId, user, title, content,
  }));
}

async function updateComment(args, context, info) {
  const { input } = args;
  const { commentId, title, content } = input;
  const { credential } = context;
  const { _id: user } = credential;
  const selectedFields = getSelectedFields(info, { recursive: true, lastOnly: true });
  return Comment.updateOne(
    { _id: commentId, user },
    removeUndefinedValue({ title, content }),
  ).then(result => {
    if (!result.matchedCount) {
      throw new GraphQLError('Unauthorized!');
    }
    return Comment.findOne({ _id: commentId, user }).select(selectedFields).lean();
  });
}

module.exports = {
  comment,
  deleteComment,
  replies,
  reply,
  updateComment,
};

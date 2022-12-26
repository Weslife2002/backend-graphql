const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({ commentId, limit, offset }, info) => {
  const posts = await Comment.find({ parent: commentId }).select(
    getSelectedFields(info, { lastOnly: true }),
  ).skip(offset || 0).offset(limit || 5);
  return posts;
};

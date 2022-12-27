const { Comment } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

module.exports = async ({ commentId, limit, offset }, info) => {
  const posts = await Comment.find(removeUndefinedValue({
    parent: commentId,
  })).select(
    getSelectedFields(info, { lastOnly: true }),
  ).skip(offset || 0).limit(limit || 5);
  return posts;
};

const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const removeUndefinedValue = require('../../utils/general/removeUndefinedValue');

module.exports = async ({ owner, title, limit, offset }, info) => {
  const posts = await Post.find(
    removeUndefinedValue({ owner, title }),
  ).select(
    getSelectedFields(info, { lastOnly: true }),
  ).skip(offset || 0).limit(limit || 5);
  return posts;
};

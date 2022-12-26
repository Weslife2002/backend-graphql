const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({owner, title, limit, offset}, info) => {
  const posts = await Post.find({ owner, title }).select(
    getSelectedFields(info, { lastOnly: true }),
  );
  return posts;
};

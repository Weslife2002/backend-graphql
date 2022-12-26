const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async (id, info) => {
  const post = await Post.findOne({ _id: id }).select(
    getSelectedFields(info, { lastOnly: true }),
  );
  return post;
};

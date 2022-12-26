const getUserId = require('../../utils/redis/getUserId');
const { Post } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async (input, token, info) => {
  const { id: _id } = input;
  const owner = await getUserId(token);
  return (Post.updateOne({ _id, owner }, input).then(
    () => Post.findOne({ _id, owner }).select(getSelectedFields(info)),
  ));
};

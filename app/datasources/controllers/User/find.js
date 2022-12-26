const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({ _id }, _, info) => {
  const selectedFields = getSelectedFields(info);
  const user = await User.findOne({ _id }).select(selectedFields);
  return user;
};

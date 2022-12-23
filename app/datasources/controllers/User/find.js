const { UserShort } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({ _id }, _, info) => {
  const selectedFields = getSelectedFields(info);
  const user = await UserShort.findOne({ _id }).select(selectedFields);
  console.log({ user });
  return user;
};

const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async (userFilterInput, info) => {
  const user = await User.findOne({ ...userFilterInput }).select(
    getSelectedFields(info, { lastOnly: true }),
  );
  return user;
};

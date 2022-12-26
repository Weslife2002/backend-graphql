const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async (username, info) => {
  const users = await User.find({ username }).select(
    getSelectedFields(info, { lastOnly: true }),
  );
  return users;
};

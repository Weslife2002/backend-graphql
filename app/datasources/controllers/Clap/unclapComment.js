const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async (id, token) => {
  const user = await getUserId(token);
  return Clap.deleteOne({ user, comment: id });
};

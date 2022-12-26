const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = (id, token) => {
  const user = getUserId(token);
  return Clap.deleteOne({ user, post: id });
};

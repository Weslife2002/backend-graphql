const clearUserCache = require('../../utils/redis/clearUserCache');
const { User } = require('../../models');

module.exports = async id => {
  await User.updateOne({ _id: id }, { status: 'Deactivated' });
  clearUserCache(id);
};

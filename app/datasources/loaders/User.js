const { User } = require('../models');

async function batchUserById(keys) {
  const users = await User.find({ _id: { $in: keys } }).lean();
  const userMap = new Map();
  users.forEach(
    user => userMap.set(user._id.toString(), user),
  );
  return keys.map(key => userMap.get(key) || null);
}

module.exports = {
  batchUserById,
};

const DataLoader = require('dataloader');
const { User } = require('../../models');

const loader = (new DataLoader(keys => batchDeleteComments(keys)));

async function batchDeleteComments(keys) {
  const users = await User.find({ _id: keys }).lean();
  const userMap = new Map();
  users.forEach(
    user => userMap.set(user._id.toString(), user),
  );
  return keys.map(key => userMap.get(key.toString()) || null);
}

module.exports = loader;

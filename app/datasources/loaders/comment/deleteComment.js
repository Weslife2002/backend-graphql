const DataLoader = require('dataloader');
const { Comment } = require('../../models');

const loader = (new DataLoader(keys => batchDeleteComments(keys)));

async function batchDeleteComments(keys) {
  const rawChildComments = await Comment.find({ parent: keys }).select('_id');
  const childComments = rawChildComments.map(childComment => childComment._id);
  loader.loadMany(childComments);
  await Comment.deleteMany({ parent: keys });
  return keys;
}

module.exports = loader;

const DataLoader = require('dataloader');
const { Post } = require('../../models');

const loader = (new DataLoader(keys => batchDeleteComments(keys)));

async function batchDeleteComments(keys) {
  const posts = await Post.find({ _id: keys }).lean();
  const postMap = new Map();
  posts.forEach(
    post => postMap.set(post._id.toString(), post),
  );
  return keys.map(key => postMap.get(key.toString()) || null);
}

module.exports = loader;

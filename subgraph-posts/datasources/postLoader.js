const Post = require('./Post');

async function batchPostById(keys) {
  const posts = await Post.find({ _id: { $in: keys } }).lean();
  const postMap = new Map();
  posts.forEach(
    post => postMap.set(post._id.toString(), post),
  );
  return keys.map(key => postMap.get(key) || null);
}

module.exports = {
  batchPostById,
};

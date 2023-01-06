const { Comment } = require('./models');

async function batchCommentById(keys) {
  const comments = await Comment.find({ _id: { $in: keys } }).lean();
  const commentMap = new Map();
  comments.forEach(
    user => commentMap.set(user._id.toString(), user),
  );
  return keys.map(key => commentMap.get(key) || null);
}

module.exports = {
  batchCommentById,
};

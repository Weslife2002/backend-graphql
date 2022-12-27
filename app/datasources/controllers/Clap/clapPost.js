const { GraphQLError } = require('graphql');
const { Clap, Post } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async ({ postId, count = 1 }, token) => {
  const user = await getUserId(token);
  return Clap.findOne({ user, post: postId }).then(
    async clapInstance => {
      if (clapInstance) {
        return Clap.updateOne({ user, post: postId }, { $inc: { count } });
      }
      const { owner } = await Post.findOne({ post: postId }).select('owner').lean();
      if (owner.toString() === user) {
        throw new GraphQLError('Unable to clap yourself');
      }
      return Clap.create({ user, post: postId, postOwner: owner, count }).then(
        createdInstance => createdInstance.save(),
      );
    },
  );
};

const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = async ({ commentId, count }, token) => {
  const user = await getUserId(token);
  return Clap.find({ user, comment: commentId }).then(
    clapInstance => {
      if (clapInstance) {
        return Clap.updateOne({ user, comment: commentId }, { $inc: { count } });
      }
      return Clap.create({ user, comment: commentId, count }).then(
        createdInstance => createdInstance.save(),
      );
    },
  );
};

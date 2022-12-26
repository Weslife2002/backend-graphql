const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = (id, token) => {
  const user = getUserId(token);
  return Clap.find({ user, post: id }).then(
    clapInstance => {
      if (clapInstance) {
        return Clap.updateOne({ user, post: id }, { $inc: { count: 1 } });
      }
      return Clap.create({ user, post: id, count: 1 }).then(
        createdInstance => createdInstance.save(),
      );
    },
  );
};

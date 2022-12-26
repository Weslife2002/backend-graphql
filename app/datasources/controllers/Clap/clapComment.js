const { Clap } = require('../../models');
const getUserId = require('../../utils/redis/getUserId');

module.exports = (id, token) => {
  const user = getUserId(token);
  return Clap.find({ user, comment: id }).then(
    clapInstance => {
      if (clapInstance) {
        return Clap.updateOne({ user, comment: id }, { $inc: { count: 1 } });
      }
      return Clap.create({ user, post: id, comment: 1 }).then(
        createdInstance => createdInstance.save(),
      );
    },
  );
};

const { Follow } = require('../../models');

async function follow(args, context, info) {
  try {
    const { signature } = context;
    const { _id: follower } = signature;
    const { followee } = args;
    const followed = await Follow.findOne({ followee, follower });
    if (followed) {
      return {
        isSucess: true,
        message: 'Follow user success!',
      };
    }
    await new Follow({ followee, follower }).save();
    return {
      isSucess: true,
      message: 'Follow user success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSucess: false,
      message: 'Fail to follow user!',
    };
  }
}

async function unfollow(args, context, info) {
  try {
    const { signature } = context;
    const { _id: follower } = signature;
    const { followee } = args;
    await Follow.deleteOne({ followee, follower });
    return {
      isSucess: true,
      message: 'Unfollow user success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSucess: false,
      message: 'Fail to unfollow user!',
    };
  }
}

module.exports = {
  follow,
  unfollow,
};

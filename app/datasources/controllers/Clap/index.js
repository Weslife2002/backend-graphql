require('../../../global');
const { Clap, Post } = require('../../models');

async function clapComment(args, context, info) {
  try {
    const { commentId, count = 1 } = args;
    const { credential } = context;
    const { _id: user } = credential;
    const isOwner = Boolean(await Comment.findOne({
      comment: commentId, user,
    }).select('user'));
    if (isOwner) {
      return {
        isSuccess: true,
        message: 'Unauthorized!',
      };
    }
    const result = await Clap.updateOne({ user, comment: commentId }, { $inc: { count } });
    if (result.matchedCount) {
      return {
        isSuccess: true,
        message: 'Clap comment success!',
      };
    }
    await Clap.create({ user, comment: commentId, count }).then(
      createdInstance => createdInstance.save(),
    );
    return {
      isSuccess: true,
      message: 'Clap comment success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: true,
      message: 'Fail to clap comment!',
    };
  }
}

async function clapPost(args, context, info) {
  try {
    const { postId, count = 1 } = args;
    const { credential } = context;
    const { _id: user } = credential;
    const { owner } = await Post.findOne({
      post: postId, owner: user,
    }).select('owner');
    if (owner) {
      return {
        isSuccess: true,
        message: 'Unauthorized!',
      };
    }
    const result = await Clap.updateOne({ user, post: postId }, { $inc: { count } });
    if (result.matchedCount) {
      return {
        isSuccess: true,
        message: 'Clap post success!',
      };
    }
    await Clap.create({ user, post: postId, postOwner: owner, count }).then(
      createdInstance => createdInstance.save(),
    );
    return {
      isSuccess: true,
      message: 'Clap post success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: true,
      message: 'Fail to clap post!',
    };
  }
}

async function unclapComment(args, context, info) {
  try {
    const { commentId } = args;
    const { credential } = context;
    const { _id: user } = credential;
    await Clap.deleteOne({ user, comment: commentId });
    return {
      isSuccess: true,
      message: 'Unclap comment success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: true,
      message: 'Fail to unclap comment!',
    };
  }
}

async function unclapPost(args, context, info) {
  try {
    const { postId } = args;
    const { credential } = context;
    const { _id: user } = credential;
    await Clap.deleteOne({ user, post: postId });
    return {
      isSuccess: true,
      message: 'Unclap post success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: true,
      message: 'Fail to unclap post!',
    };
  }
}
module.exports = {
  clapComment,
  clapPost,
  unclapComment,
  unclapPost,
};

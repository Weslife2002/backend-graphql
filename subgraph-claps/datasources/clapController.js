require('../global');
const { Clap, Post, Comment } = require('./models');

async function clapComment(args, context, info) {
  try {
    const { commentId, count = 1 } = args;
    const { signature } = context;
    const { _id: user } = signature;
    const isOwner = await Comment.findOne({
      _id: commentId, user,
    }).select('_id').lean();
    if (isOwner) {
      return {
        isSuccess: false,
        message: 'Unauthorized!',
      };
    }
    await Clap.updateOne(
      { user, comment: commentId },
      { $inc: { count } },
      { upsert: true },
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
    const { signature } = context;
    const { _id: owner } = signature;
    const isOwner = await Post.findOne({
      _id: postId, owner,
    });
    if (isOwner) {
      return {
        isSuccess: false,
        message: 'Unauthorized!',
      };
    }
    await Clap.updateOne(
      { post: postId, user: owner },
      { $inc: { count } },
      { upsert: true },
    );
    return {
      isSuccess: true,
      message: 'Clap post success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: false,
      message: 'Fail to clap post!',
    };
  }
}

async function unclapComment(args, context, info) {
  try {
    const { commentId } = args;
    const { signature } = context;
    const { _id: user } = signature;
    await Clap.deleteOne({ user, comment: commentId });
    return {
      isSuccess: true,
      message: 'Unclap comment success!',
    };
  } catch (error) {
    logger.error(JSON.stringify(error.stack));
    return {
      isSuccess: true,
      message: 'Fail to unclap comment!',
    };
  }
}

async function unclapPost(args, context, info) {
  try {
    const { postId } = args;
    const { signature } = context;
    const { _id: user } = signature;
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

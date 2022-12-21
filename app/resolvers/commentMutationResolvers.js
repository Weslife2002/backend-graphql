const { HeadComment, ReplyComment } = require('../models');
const responseMessage = require('../utils/otherUtils/responseMessage');

module.exports = {
  commentPost: async (_, { postContentId, content }, { req }) => {
    try {
      if (!req.session.user || !req.session.user.email) {
        return responseMessage(403, false, 'You must login to comment the post');
      }
      const newComment = HeadComment.insertMany([{
        authorEmail: req.session.user.email,
        postContentId,
        content,
      }]);
      return responseMessage(200, true, 'Comment post success', { newComment });
    } catch (error) {
      return responseMessage(500, false, error.message);
    }
  },

  replyComment: async (_, { headCommentId, replyCommentId, content }, { req }) => {
    try {
      if (!req.session.user || !req.session.user.email) {
        return responseMessage(403, false, 'You must login to comment the post');
      }
      const newComment = await ReplyComment.insertMany([{
        authorEmail: req.session.user.email,
        content,
      }]);

      if (headCommentId) {
        HeadComment.updateOne(
          { headCommentId },
          { $push: { replies: newComment._id } },
        );
      }
      if (replyCommentId) {
        replyCommentId.updateOne(
          { replyCommentId },
          { $push: { replies: newComment._id } },
        );
      }

      return responseMessage(200, true, 'Comment post success', { newComment });
    } catch (error) {
      return responseMessage(500, false, error.message);
    }
  },
};

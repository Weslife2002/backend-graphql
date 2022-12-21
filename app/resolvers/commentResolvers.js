const { Comment, UserShort } = require('../models');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');

module.exports = {
  Comment: {
    author: async ({ authorEmail }, _, __, info) => {
      const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
      const author = await UserShort.findOne({ email: authorEmail }).select(rawSelectedFields);
      return author;
    },
    numberOfReplies: async ({ replies }) => {
      if (!replies) {
        return 0;
      }
      return replies.length;
    },
    replies: async ({ replies }, _, __, info) => {
      const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
      const selectedFields = rawSelectedFields.concat('authorEmail', 'replies');
      const replyComments = await Comment.find({ _id: { $in: replies } }).select(selectedFields);
      return replyComments;
    },
  },
};

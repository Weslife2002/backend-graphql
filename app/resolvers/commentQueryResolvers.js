const { Comment } = require('../models');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');

module.exports = {
  getCommentsByPostId: async (_, { postContentId }, __, info) => {
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    const comments = await Comment.find({ postContentId }).select(rawSelectedFields);
    return comments;
  },
};

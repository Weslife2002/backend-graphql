const { HeadComment } = require('../models');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');

module.exports = {
  getCommentsByPostId: async (_, { postContentId }, __, info) => {
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    const selectedFields = rawSelectedFields.concat('authorEmail');
    const comments = await HeadComment.find({ postContentId }).select(selectedFields);
    return comments;
  },
};

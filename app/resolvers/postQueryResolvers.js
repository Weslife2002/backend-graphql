const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');
const { PostContent } = require('../models');

module.exports = {
  getPostContentById: async (_, { postContentId }, __, info) => {
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    const selectedFields = rawSelectedFields.concat('authorEmail');
    const foundPostContent = await PostContent.findOne({
      _id: postContentId,
    }).select(selectedFields);
    return foundPostContent;
  },
};

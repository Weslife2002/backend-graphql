const { PostThumbnail } = require('../models/PostThumbnail');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');

const userResolvers = {
  UserShort: {
    posts: async ({ email }, _, __, info) => {
      const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
      const selectedFields = rawSelectedFields;
      const postThumbnails = await PostThumbnail.find({ authorEmail: email }).select(selectedFields);
      return postThumbnails;
    },
  },
  UserSignUpReponse: {
    __resolveType({ user, error }) {
      if (user) {
        return 'UserSignUpSuccessReponse';
      }
      if (error) {
        return 'UserSignUpErrorReponse';
      }
      return null;
    },
  },
};

module.exports = userResolvers;

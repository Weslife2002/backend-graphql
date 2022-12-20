const getRawSelectedFields = require('../utils/otherUtils/getSelectedFields');
const { logger } = require('../global');
const { UserAccount } = require('../models');
const manageSessionsOnLogin = require('../utils/userUtils/manageSessionsOnLogin');
const responseMessage = require('../utils/otherUtils/responseMessage');

module.exports = {
  userAuth: async (_, { email, password }, { req }, info) => {
    try {
      const rawSelectedFieldMap = new Map();
      rawSelectedFieldMap.set('user.username', 'username');
      rawSelectedFieldMap.set('user.email', 'email');
      rawSelectedFieldMap.set('user.photoUrl', 'photoUrl');
      rawSelectedFieldMap.set('user.followingTopics', 'followingTopics');
      rawSelectedFieldMap.set('user.numberOfNewNotifications', 'numberOfNewNotifications');
      const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
      const selectedFields = rawSelectedFields.map(
        rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
      );
      const foundUser = await UserAccount.findOne({ email, password }).select(selectedFields);
      if (foundUser) {
        const { username, photoUrl, followingTopics, numberOfNewNotifications } = foundUser;
        manageSessionsOnLogin(req, { email, username, photoUrl, followingTopics, numberOfNewNotifications });
        return responseMessage(200, true, 'Authentication successes!', {
          user: {
            email,
            username,
          },
        });
      }
      return responseMessage(403, false, 'Authentication fails!');
    } catch (error) {
      logger.error(JSON.stringify({ errorMessage: error.message, errorName: error.name }));
      return responseMessage(500, false, 'Internal Server Error!');
    }
  },
  googleUserAuth: async (_, __) => {
    // TODO: Google Authentication
    logger.info('Google user login');
    return {
      code: 200,
      message: 'Google user login successfully',
      success: true,
    };
  },
  facebookUserAuth: async (_, __) => {
    // TODO: Facebook Authentication
    logger.info('Facebook user login');
    return {
      code: 200,
      message: 'Facebook user login successfully',
      success: true,
    };
  },
};

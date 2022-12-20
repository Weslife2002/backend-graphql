const { logger } = require('../global');
const { UserAccount, UserShort } = require('../models');
const responseMessage = require('../utils/otherUtils/responseMessage');
const manageSessionsOnLogin = require('../utils/userUtils/manageSessionsOnLogin');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');

module.exports = {
  userSignUp: async (_, { userSignUpInput }, { req }) => {
    try {
      const { email, username, password } = userSignUpInput;
      const newUserAccounts = await UserAccount.insertMany([{ email, username, password }]);
      if (newUserAccounts) {
        const {
          photoUrl, followingTopics, numberOfNewNotifications, bio, numberOfFollowers,
        } = newUserAccounts[0];
        await UserShort.insertMany([{ email, username, photoUrl, bio, numberOfFollowers }]);
        manageSessionsOnLogin(req, {
          email, username, photoUrl, followingTopics, numberOfNewNotifications,
        });
        return responseMessage(200, true, 'Create new user successfully!', { user: {
          email, username, photoUrl, followingTopics, numberOfNewNotifications,
        } });
      }
      return responseMessage(400, false, 'Fail to create new user!', { error: {
        name: 'Cannot create new user!',
        message: 'Something went wrong!',
      } });
    } catch (error) {
      logger.error(JSON.stringify({ errorMessage: error.message, errorName: error.name }));
      return responseMessage(500, false, 'Internal Server Error!', {
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  },
  userAuth: async (_, { email, password }, { req }, info) => {
    try {
      const rawSelectedFieldMap = new Map();
      rawSelectedFieldMap.set('user.username', 'username');
      rawSelectedFieldMap.set('user.email', 'email');
      rawSelectedFieldMap.set('user.photoUrl', 'photoUrl');
      rawSelectedFieldMap.set('user.followingTopics', 'followingTopics');
      rawSelectedFieldMap.set('user.numberOfNewNotifications', 'numberOfNewNotifications');

      const fragmentSelectionSet = info.fieldNodes[0].selectionSet;
      const rawSelectedFields = (
        fragmentSelectionSet.selections[0].typeCondition.name.value === 'UserAuthSuccessReponse'
          ? getRawSelectedFields(fragmentSelectionSet.selections[0].selectionSet)
          : getRawSelectedFields(fragmentSelectionSet.selections[1].selectionSet)
      );

      const selectedFields = rawSelectedFields.map(
        rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
      );
      const foundUserAccount = await UserAccount.findOne({ email, password }).select(selectedFields);
      if (foundUserAccount) {
        const { username, photoUrl, followingTopics, numberOfNewNotifications } = foundUserAccount;
        manageSessionsOnLogin(req, { email, username, photoUrl, followingTopics, numberOfNewNotifications });
        return responseMessage(200, true, 'Authentication success!', {
          user: {
            email,
            username,
            photoUrl,
            followingTopics,
            numberOfNewNotifications,
          },
        });
      }
      return responseMessage(403, false, 'Authentication fails!', {
        error: { name: 'Forbidden!', message: 'Wrong username or password' },
      });
    } catch (error) {
      logger.error(JSON.stringify({ errorMessage: error.message, errorName: error.name }));
      return responseMessage(500, false, 'Internal Server Error!', {
        error: { message: error.message, name: error.name },
      });
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

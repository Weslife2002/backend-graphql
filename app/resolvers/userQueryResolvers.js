const { logger } = require('../global');
const { UserAccount } = require('../models');
const manageSessionsOnLogin = require('../utils/userResolversUtils/manageSessionsOnLogin');
const responseMessage = require('../utils/otherUtils/responseMessage');

module.exports = {
  userAuth: async (_, { email, password }, { req }) => {
    try {
      const foundUser = await UserAccount.findOne({ email, password });
      if (foundUser) {
        const { username, photo, bio } = foundUser;
        manageSessionsOnLogin(req, email, username, photo, bio);
        return responseMessage(200, true, 'Authentication success!', { user: {
          email,
          username,
          photo,
          bio,
        } });
      }
      return responseMessage(403, false, 'Authentication fails!', { user: null });
    } catch (error) {
      return responseMessage(500, false, 'Internal Server Error!', { user: null });
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
  userSignUp: async (_, { userSignUpInput }, { req }) => {
    try {
      const { email, username, password } = userSignUpInput;
      const newUserAccounts = await UserAccount.insertMany([{ email, username, password }]);
      if (newUserAccounts) {
        req.session.user = {
          email,
          username,
        };
        return responseMessage(200, true, 'Create new user successfully!', { newUser: {
          email,
          username,
        } });
      }
      return responseMessage(400, false, 'Fail to create new user!', { newUser: null });
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: 'Internal Server Error',
      };
    }
  },
};

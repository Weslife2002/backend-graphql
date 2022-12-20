const { logger } = require('../global');
const { UserAccount } = require('../models');
const responseMessage = require('../utils/otherUtils/responseMessage');
const manageSessionsOnLogin = require('../utils/userUtils/manageSessionsOnLogin');

module.exports = {
  userSignUp: async (_, { userSignUpInput }, { req }) => {
    try {
      const { email, username, password } = userSignUpInput;
      const newUserAccounts = await UserAccount.insertMany([{ email, username, password }]);
      if (newUserAccounts) {
        const { photoUrl, followingTopics, numberOfNewNotifications } = newUserAccounts[0];
        manageSessionsOnLogin(req, {
          email, username, photoUrl, followingTopics, numberOfNewNotifications,
        });

        return responseMessage(200, true, 'Create new user successfully!', { user: {
          email, username, photoUrl, followingTopics, numberOfNewNotifications,
        } });
      }
      return responseMessage(400, false, 'Fail to create new user!');
    } catch (error) {
      logger.error(JSON.stringify({ errorMessage: error.message, errorName: error.name }));
      return responseMessage(500, false, 'Internal Server Error!');
    }
  },
};

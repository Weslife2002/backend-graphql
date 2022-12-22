const { UserShort, UserAccount } = require('../models');
const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');
const responseMessage = require('../utils/otherUtils/responseMessage');
const manageSessionsOnLogin = require('../utils/userUtils/manageSessionsOnLogin');

module.exports = {
  findUserShortByUserId: async ({ userId }, _, info) => {
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    console.log({ userId });
    console.log({ rawSelectedFields });
    const foundUserShort = await UserShort.findOne({ userId }).select(rawSelectedFields);
    return foundUserShort;
  },
  signUpUser: async (_, { userSignUpInput }, { req }) => {
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
      return responseMessage(400, false, 'Cannot create a new user!');
    } catch (error) {
      logger.error(JSON.stringify({ error: error.stack }));
      return responseMessage(500, false, error.message);
    }
  },
};

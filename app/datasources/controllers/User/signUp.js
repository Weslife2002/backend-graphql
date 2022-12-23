const { UserShort, UserAccount } = require('../../models');
const getRawSelectedFields = require('../../utils/otherUtils/getRawSelectedFields');
const responseMessage = require('../../utils/otherUtils/responseMessage');
const manageSessionsOnLogin = require('../../utils/userUtils/manageSessionsOnLogin');

module.exports = async (_, { userSignUpInput }, { req }) => {
  try {
    const { email, username, password } = userSignUpInput;
    const newUsers = await UserAccount.insertMany([{ email, username, password }]);
    const { userId, photoUrl, role, newNotificationsNo } = newUsers[0];

    UserShort.insertMany([{ email, username }]);
    manageSessionsOnLogin(req, {
      userId, username, photoUrl, role, newNotificationsNo,
    });
    return responseMessage(200, true, 'Create new user successfully!', { newUser: {
      userId, username, photoUrl, role, newNotificationsNo,
    } });
  } catch (error) {
    logger.error(JSON.stringify({ error: error.stack }));
    return responseMessage(500, false, error.message);
  }
};

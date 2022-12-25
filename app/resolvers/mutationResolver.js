require('../global');
const responseMessage = require('../utils/responseMessage');

module.exports = {
  register: async (_, { email, username, password }, { dataSources, req }, ___) => {
    try {
      const { newUser, token } = await dataSources.User.register({ email, username, password }, { req });
      return responseMessage(true, 'Register successfully', { newUser, token });
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  login: async (_, { username, password }, { dataSources, req }, info) => {
    try {
      const { user, token } = await dataSources.User.login(
        { username, password },
        { req },
        info,
      );
      return responseMessage(true, 'Authentication successfully', { user, token });
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
};

const userResolvers = {
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
  UserAuthReponse: {
    __resolveType({ user, error }) {
      if (user) {
        return 'UserAuthSuccessReponse';
      }
      if (error) {
        return 'ErrorReponse';
      }
      return null;
    },
  },
};

module.exports = userResolvers;

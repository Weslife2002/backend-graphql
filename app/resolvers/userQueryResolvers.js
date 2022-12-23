module.exports = {
  user: async (_, { userId }, { dataSources }, info) => {
    const user = dataSources.User.find({ userId }, _, info);
    return user;
  },
};

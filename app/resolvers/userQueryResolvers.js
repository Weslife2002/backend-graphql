module.exports = {
  findUserShortByUserId: async (_, { userId }, { dataSources }, info) => {
    const foundUserShort = dataSources.findUserShortByUserId({ userId }, _, info);
    return foundUserShort;
  },
};

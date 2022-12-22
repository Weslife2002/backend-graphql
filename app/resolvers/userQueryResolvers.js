module.exports = {
  findUserShortByEmail: async (_, { email }, { dataSources }, info) => {
    const foundUserShort = dataSources.findUserShortByEmail({ email }, _, info);
    return foundUserShort;
  },
};

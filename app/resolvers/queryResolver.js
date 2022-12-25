module.exports = {
  getSession: async (_, __, { dataSources, req }, ___) => {
    const token = req.headers.authorization.split(' ')[1];
    const session = await dataSources.User.getSession(token);
    return session;
  },
};

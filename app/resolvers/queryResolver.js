module.exports = {
  getSession: async (_, __, { dataSources, req }, ___) => {
    const token = req.headers.authorization.split(' ')[1];
    const session = await dataSources.User.getSession(token);
    return session;
  },
  me: async (_, __, { dataSources, req }, info) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = await dataSources.User.me(token, info);
    return user;
  },
  user: async (_, { input }, { dataSources }, info) => {
    const user = await dataSources.User.user(input, info);
    return user;
  },
  users: async (_, { username }, { dataSources }, info) => {
    const user = await dataSources.User.users(username, info);
    return user;
  },
  post: async (_, { id }, { dataSources }, info) => {
    const user = await dataSources.Post.post(id, info);
    return user;
  },
  posts: async (_, { input }, { dataSources }, info) => {
    const user = await dataSources.Post.posts(input, info);
    return user;
  },
  replies: async (_, { input }, { dataSources }, info) => {
    const user = await dataSources.Comment.replies(input, info);
    return user;
  },
};

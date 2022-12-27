module.exports = {
  Post: {
    clapCount: async (
      { _id },
      _,
      { dataSources },
    ) => dataSources.loaders.Clap.clapCount.load(_id),
    owner: async (
      { owner },
      _,
      { dataSources },
    ) => dataSources.loaders.User.user.load(owner),
  },
  User: {
    followerCount: async (
      { _id },
      _,
      { dataSources },
    ) => dataSources.loaders.Follow.followerCount.load(_id),
  },
  Clap: {
    comment: () => {},
    post: (
      { post },
      _,
      { dataSources },
    ) => (dataSources.loaders.Post.post.load(post)),
    user: (
      { user },
      _,
      { dataSources },
    ) => dataSources.loaders.User.user.load(user),
  },
  Comment: {
    post: (
      { post },
      _,
      { dataSources },
    ) => (dataSources.loaders.Post.post.load(post)),
    user: (
      { user },
      _,
      { dataSources },
    ) => (dataSources.loaders.User.user.load(user)),
  },

};

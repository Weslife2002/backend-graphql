const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
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

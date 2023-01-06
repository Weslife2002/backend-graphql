const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function followResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Follow.follow(args, context, info);
}
function unfollowResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Follow.unfollow(args, context, info);
}

async function followerCountResolver(parent, args, context, info) {
  const { _id } = parent;
  const { loaders } = context;
  return loaders.followerCountOfUser.load(_id);
}

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
  Query: {
  },
  Mutation: {
    follow: followResolver,
    unfollow: unfollowResolver,
  },
  User: {
    followerCount: followerCountResolver,
  },
};

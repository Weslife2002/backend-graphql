const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function clapPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.clapPost(args, context, info);
}
function unclapPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.unclapPost(args, context, info);
}
function clapCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.clapComment(args, context, info);
}
function unclapCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.unclapComment(args, context, info);
}

function clapCountResolver(parent, args, context, info) {
  const { _id } = parent;
  const { loaders } = context;
  return loaders.clapCountOfPost.load(_id.toString());
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
    clapPost: clapPostResolver,
    unclapPost: unclapPostResolver,
    clapComment: clapCommentResolver,
    unclapComment: unclapCommentResolver,
  },
  Post: {
    clapCount: clapCountResolver,
  },
};

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function replies(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.replies(args, context, info);
}

function commentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.comment(args, context, info);
}
function updateCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.updateComment(args, context, info);
}
function replyResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.reply(args, context, info);
}
function deleteCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.deleteComment(args, context, info);
}

function resolveReference(reference, context, info) {
  const { _id } = reference;
  const { loaders } = context;
  return loaders.commentById.load(_id.toString());
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
    replies,
  },
  Mutation: {
    comment: commentResolver,
    updateComment: updateCommentResolver,
    reply: replyResolver,
    deleteComment: deleteCommentResolver,
  },
  Comment: {
    __resolveReference: resolveReference,
  },
};

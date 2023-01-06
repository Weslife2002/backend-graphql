const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function postResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.post(args, context, info);
}

function postsResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.posts(args, context, info);
}

function createPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.createPost(args, context, info);
}
function updatePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.updatePost(args, context, info);
}
function deletePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.deletePost(args, context, info);
}
function hidePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.hidePost(args, context, info);
}

function resolveReference(reference, context, info) {
  const { _id } = reference;
  const { loaders } = context;
  return loaders.postById.load(_id.toString());
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
    post: postResolver,
    posts: postsResolver,
  },
  Mutation: {
    createPost: createPostResolver,
    updatePost: updatePostResolver,
    deletePost: deletePostResolver,
    hidePost: hidePostResolver,
  },
  Post: {
    __resolveReference: resolveReference,
  },
};

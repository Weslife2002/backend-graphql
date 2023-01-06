const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function meResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.me(args, context, info);
}

function userResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.user(args, context, info);
}

function usersResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.users(args, context, info);
}

function registerResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.register(args, context, info);
}
function loginResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.login(args, context, info);
}
function logoutResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.logout(args, context, info);
}
function disableUserResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.disableUser(args, context, info);
}
function resolveReference(reference, context, info) {
  const { _id } = reference;
  const { loaders } = context;
  return loaders.userById.load(_id.toString());
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
    me: meResolver,
    user: userResolver,
    users: usersResolver,
  },
  Mutation: {
    register: registerResolver,
    login: loginResolver,
    logout: logoutResolver,
    disableUser: disableUserResolver,
  },
  User: {
    __resolveReference: resolveReference,
  },
};

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const resolver = require('./resolver');
const Query = require('./queryResolver');
const Mutation = require('./mutationResolver');

const resolvers = {
  ...resolver,
  Query,
  Mutation,
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
};

module.exports = resolvers;

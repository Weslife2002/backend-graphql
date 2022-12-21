const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const queryResolvers = require('./queryResolvers');
const userResolvers = require('./userResolvers');
const mutationResolvers = require('./mutationResolvers');
const postResolvers = require('./postResolvers');
const commentResolvers = require('./commentResolvers');

const resolvers = {
  ...userResolvers,
  ...postResolvers,
  ...queryResolvers,
  ...mutationResolvers,
  ...commentResolvers,
  Date: new GraphQLScalarType({
    name: 'Date',
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
  GeneralMutationResponse: {
    __resolveType({ success, error }) {
      if (success) {
        return 'SuccessResponse';
      }
      if (error) {
        return 'ErrorReponse';
      }
      return null;
    },
  },
};

module.exports = resolvers;

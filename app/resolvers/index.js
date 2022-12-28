const resolver = require('./resolver');
const Query = require('./queryResolver');
const Mutation = require('./mutationResolver');

const resolvers = {
  ...resolver,
  Query,
  // Query: (() => {
  //   try {
  //     return Query;
  //   } catch (error) {
  //     throw GraphQLError('went here');
  //   }
  // }),
  Mutation,
};

module.exports = resolvers;

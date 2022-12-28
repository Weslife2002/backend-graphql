const resolver = require('./resolver');
const Query = require('./queryResolver');
const Mutation = require('./mutationResolver');

const resolvers = {
  ...resolver,
  Query,
  Mutation,
};

module.exports = resolvers;

const queryResolvers = require('./queryResolvers');
const userResolvers = require('./userResolvers');

const resolvers = {
  ...userResolvers,
  ...queryResolvers,
};

module.exports = resolvers;

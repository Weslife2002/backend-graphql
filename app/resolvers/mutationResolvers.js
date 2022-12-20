const userMutationResolvers = require('./userMutationResolvers');

const mutationResolvers = {
  Mutation: {
    ...userMutationResolvers,
  },
};

module.exports = mutationResolvers;

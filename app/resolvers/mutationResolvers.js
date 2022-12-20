const postMutationResolvers = require('./postMutationResolvers');
const userMutationResolvers = require('./userMutationResolvers');

const mutationResolvers = {
  Mutation: {
    ...userMutationResolvers,
    ...postMutationResolvers,
  },
};

module.exports = mutationResolvers;

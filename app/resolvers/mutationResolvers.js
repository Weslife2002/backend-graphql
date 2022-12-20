const postMutationResolvers = require('./postMutationResolvers');
const userMutationResolvers = require('./userMutationResolvers');
const applauseMutationResolvers = require('./applauseMutationResolvers');

const mutationResolvers = {
  Mutation: {
    ...userMutationResolvers,
    ...postMutationResolvers,
    ...applauseMutationResolvers,
  },
};

module.exports = mutationResolvers;

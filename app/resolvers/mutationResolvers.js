const postMutationResolvers = require('./postMutationResolvers');
const userMutationResolvers = require('./userMutationResolvers');
const applauseMutationResolvers = require('./applauseMutationResolvers');
const commentMutationResolvers = require('./commentMutationResolvers');

const mutationResolvers = {
  Mutation: {
    ...userMutationResolvers,
    ...postMutationResolvers,
    ...applauseMutationResolvers,
    ...commentMutationResolvers,
  },
};

module.exports = mutationResolvers;

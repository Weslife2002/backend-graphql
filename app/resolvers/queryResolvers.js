const otherQueryResolvers = require('./otherQueryResolvers');
const postQueryResolvers = require('./postQueryResolvers');
const userQueryResolvers = require('./userQueryResolvers');
const commentQueryResolvers = require('./commentQueryResolvers');

const queryResolvers = {
  Query: {
    ...userQueryResolvers,
    ...otherQueryResolvers,
    ...postQueryResolvers,
    ...commentQueryResolvers,
  },
};

module.exports = queryResolvers;

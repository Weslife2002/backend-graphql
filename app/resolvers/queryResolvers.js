const otherQueryResolvers = require('./otherQueryResolvers');
const postQueryResolvers = require('./postQueryResolvers');
const userQueryResolvers = require('./userQueryResolvers');

const queryResolvers = {
  Query: {
    ...userQueryResolvers,
    ...otherQueryResolvers,
    ...postQueryResolvers,
  },
};

module.exports = queryResolvers;

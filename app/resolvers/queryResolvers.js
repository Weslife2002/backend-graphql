const otherQueryResolvers = require('./otherQueryResolvers');
const userQueryResolvers = require('./userQueryResolvers');

const queryResolvers = {
  Query: {
    ...userQueryResolvers,
    ...otherQueryResolvers,
  },
};

module.exports = queryResolvers;

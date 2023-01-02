const clapMutation = require('./clapMutation');
const clapQuery = require('./clapQuery');

module.exports = {
  ...clapMutation,
  ...clapQuery,
};

const commentMutation = require('./commentMutation');
const commentQuery = require('./commentQuery');

module.exports = {
  ...commentMutation,
  ...commentQuery,
};

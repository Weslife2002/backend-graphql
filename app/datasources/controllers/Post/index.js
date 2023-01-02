const postMutation = require('./postMutation');
const postQuery = require('./postQuery');

module.exports = {
  ...postMutation,
  ...postQuery,
};

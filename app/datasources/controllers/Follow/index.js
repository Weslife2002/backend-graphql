const followMutation = require('./followMutation');
const followQuery = require('./followQuery');

module.exports = {
  ...followMutation,
  ...followQuery,
};

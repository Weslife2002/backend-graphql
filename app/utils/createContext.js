/* eslint-disable default-case */
const gql = require('graphql-tag');
const { GraphQLError } = require('graphql');
const getRole = require('./getRole');

module.exports = async ({ req, res }) => {
  // const graphqlQuery = req.body.query;
  const guestScope = [
    'getSession', // Debug only
    'users',
    'post', 'posts',
    'register', 'login',
  ];
  const userScope = [
    'me',
    'replies',
    'follow', 'unfollow',
    'createPost', 'deletePost', 'hidePost', 'updatePost',
    'clapPost', 'unclapPost',
    'clapComment', 'unclapComment',
    'comment', 'updateComment', 'reply', 'deleteComment',
  ];
  const adminScope = [
    'user',
    'disableUser',
  ];
  let role;
  let graphqlQuery;
  try {
    role = await getRole(req.headers.authorization);
    graphqlQuery = gql`${req.body.query}`;
  } catch (error) {
    throw GraphQLError(error.message);
  }
  switch (role) {
    case 'User':
      graphqlQuery.definitions.forEach(query => {
        query.selectionSet.selections.forEach(selection => {
          if ([...userScope, ...guestScope].findIndex(
            command => command === selection.name.value,
          ) === -1) {
            throw new GraphQLError('You are not authorized to perform this action.');
          }
        });
      });
      break;
    case 'Admin':
      graphqlQuery.definitions.forEach(query => {
        query.selectionSet.selections.forEach(selection => {
          if ([...userScope, ...guestScope, ...adminScope].findIndex(
            command => command === selection.name.value,
          ) === -1) {
            throw new GraphQLError('You are not authorized to perform this action.');
          }
        });
      });
      break;
    default:
      graphqlQuery.definitions.forEach(query => {
        query.selectionSet.selections.forEach(selection => {
          if ([...guestScope].findIndex(
            command => command === selection.name.value,
          ) === -1) {
            throw new GraphQLError('You are not authorized to perform this action.', 'FORBIDDEN');
          }
        });
      });
      break;
  }
  return { req, res };
};

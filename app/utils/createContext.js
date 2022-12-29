/* eslint-disable default-case */
const gql = require('graphql-tag');
const { GraphQLError } = require('graphql');
const redisClient = require('./redisClient');
const union = require('./union');
const createLoader = require('./createLoaders');

module.exports = async ({ req }) => {
  const guestScope = [
    'users',
    'post', 'posts',
    'register', 'login',
  ];
  const userScope = [
    'logout',
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
  const graphqlAST = gql`${req.body.query}`;
  const graphqlselections = graphqlAST.definitions.map(query => query.selectionSet.selections).flat();
  const graphqlQueries = graphqlselections.map(selection => selection.name.value);

  if (union(userScope, adminScope, graphqlQueries) === []) {
    return {
      loader: createLoader(),
    };
  }
  const token = req.headers.authorization;
  if (!token) {
    throw new GraphQLError('Unauthorized!');
  }
  const _id = token.split(':')[0];
  const role = await redisClient.get(token);

  if (!role || (union(adminScope, graphqlQueries) !== [] && role !== 'Admin')) {
    throw new GraphQLError('Unauthorized!');
  }
  return {
    credential: {
      _id,
      role,
    },
    loader: createLoader(),
  };
};

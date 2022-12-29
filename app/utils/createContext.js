/* eslint-disable default-case */
const gql = require('graphql-tag');
const { GraphQLError } = require('graphql');
const redisClient = require('./redisClient');
const createLoaders = require('./createLoaders');
const intersection = require('./intersection');

module.exports = async ({ req }) => {
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

  if (intersection(userScope.concat(adminScope), graphqlQueries).length === 0) {
    return {
      loaders: createLoaders(),
    };
  }

  const token = req.headers.authorization;
  if (!token) {
    throw new GraphQLError('Unauthorized!');
  }
  const _id = token.split(':')[0];
  const role = await redisClient.get(token);

  if (!role || (intersection(adminScope, graphqlQueries) !== [] && role !== 'Admin')) {
    throw new GraphQLError('Unauthorized!');
  }
  return {
    credential: {
      _id,
      role,
    },
    loaders: createLoaders(),
  };
};

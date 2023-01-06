/* eslint-disable default-case */
const gql = require('graphql-tag');
const { GraphQLError } = require('graphql');
const redisClient = require('./redisClient');
const createLoaders = require('./createLoaders');
const intersection = require('./intersection');
const datasources = require('../datasources');

async function createContext({ req }) {
  const userScope = [
    'follow', 'unfollow',
  ];
  const adminScope = [
  ];
  const graphqlAST = gql`${req.body.query}`;
  const graphqlselections = graphqlAST.definitions.map(query => query.selectionSet.selections).flat();
  const graphqlQueries = graphqlselections.map(selection => selection.name.value);

  if (intersection(userScope.concat(adminScope), graphqlQueries).length === 0) {
    return {
      loaders: createLoaders(),
      dataSources: datasources,
    };
  }
  const token = req.headers.authorization;
  if (!token) {
    throw new GraphQLError('Unauthorized!');
  }
  const _id = token.split(':')[0];
  const role = await redisClient.get(token);

  if (!role || (intersection(adminScope, graphqlQueries).length > 0 && role !== 'Admin')) {
    throw new GraphQLError('Unauthorized!');
  }
  return {
    signature: {
      _id,
      role,
      token,
    },
    loaders: createLoaders(),
    dataSources: datasources,
  };
}

module.exports = createContext;

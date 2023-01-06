const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { readFileSync } = require('fs');
const gql = require('graphql-tag');

require('./global');
const config = require('./config');
const createContext = require('./utils/createContext');

const typeDefs = gql(readFileSync('./Clap.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');
const customizeDirective = require('./utils/customizeDirective');

async function startApolloServer() {
  const server = new ApolloServer({
    schema: customizeDirective(
      buildSubgraphSchema({ typeDefs, resolvers }),
    ),
  });

  const { subgraphName } = config.server;

  try {
    const { url } = await startStandaloneServer(server, {
      context: createContext,
      listen: { port: config.server.port },
    });

    logger.info(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    logger.error(err);
  }
}

startApolloServer();

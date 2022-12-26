const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const createContext = require('./utils/createContext');
const datasources = require('./datasources');
const resolvers = require('./resolvers');
const typeDefs = require('./schemas');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: datasources,
  context: createContext,
  formatError: error => (error),
});

module.exports = {
  server,
  app,
};

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const createContext = require('./utils/createContext');
const datasources = require('./datasources');
const resolvers = require('./resolvers');
const typeDefs = require('./schemas');
const customizeDirective = require('./utils/customizeDirective');

const app = express();

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = customizeDirective(schema);

const server = new ApolloServer({
  schema,
  dataSources: datasources,
  context: createContext,
  formatError: error => (error),
});

module.exports = {
  server,
  app,
};

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const Mongoose = require('mongoose');
const session = require('express-session');
const ConnectRedis = require('connect-redis');
const redisClient = require('./utils/redisUtils/redisClient');
const { mongodbConnectURI } = require('./configs');
const resolvers = require('./resolvers');
const configs = require('./configs');
const { logger } = require('./global');
const typeDefs = require('./schemas');

Mongoose.connect(mongodbConnectURI);
const RedisStore = ConnectRedis(session);

async function startServer() {
  const app = express();
  app.use(session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    cookie: {
      maxAge: configs.sessionTimeOut,
      secure: false,
      httpOnly: true,
    },
    resave: true,
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  server.applyMiddleware({ app });

  // app.get('/facebook-auth', passport.authenticate('facebook', { scope: ['email'] }));

  app.listen(4000, () => {
    logger.info(`🚀. Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

module.exports = startServer;

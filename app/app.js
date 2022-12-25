const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const datasources = require('./datasources');
const resolvers = require('./resolvers');
const typeDefs = require('./schemas');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: datasources,
  context: ({ req, res }) => ({ req, res }),
});

module.exports = {
  server,
  app,
};

// async function startServer() {
//   const app = express();
//   app.use(session({
//     secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
//     store: new RedisStore({ client: redisClient }),
//     saveUninitialized: true,
//     cookie: {
//       maxAge: config.sessionTimeOut,
//       secure: false,
//       httpOnly: true,
//     },
//     resave: true,
//   }));

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     dataSources: datasources,
//     context: ({ req, res }) => ({ req, res }),
//   });

//   await server.start();

//   server.applyMiddleware({ app });

//   app.listen(4000, () => {
//     console.log(`🚀. Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// }

// module.exports = startServer;

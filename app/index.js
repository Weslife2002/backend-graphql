require('./global');
const config = require('./config');
const { app, server } = require('./app');

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  // const server = app.listen(config.port, '0.0.0.0', () => {
  //   logger.info(`🚀 Running on port ${config.port}`);
  // });
  app.listen(config.server.port, () => {
    logger.info(`🚀. Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  process.on('uncaughtException', exception => {
    logger.warn(exception);
  });

  process.on('unhandledRejection', reason => {
    logger.warn(reason.stack || reason);
  });

  process.on('SIGINT', () => {
    logger.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown');
    shutdown();
  });

  process.on('SIGTERM', () => {
    logger.info('Got SIGTERM (docker container stop). Graceful shutdown');
    shutdown();
  });

  function shutdown() {
    server.close(err => {
      if (err) {
        logger.error('SHUTDOWN ERROR', err);
        process.exitCode = 1;
      }
      process.exit();
    });
  }
};

startServer();

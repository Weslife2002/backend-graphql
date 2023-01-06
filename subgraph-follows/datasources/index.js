const mongoose = require('mongoose');
const config = require('../config');
const Follow = require('./followController');
const loaders = require('./followLoaders');

if (config.nodeEnv !== 'test') {
  mongoose.set('strictQuery', true);
  mongoose.connect(config.mongo.database, config.mongo.options, err => {
    if (err) {
      logger.error(`mongodb connection failed ${err}`);
    } else {
      logger.info('hello from mongodb');
    }
  });
}

module.exports = { Follow, loaders };

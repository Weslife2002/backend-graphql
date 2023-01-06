const mongoose = require('mongoose');
const config = require('../config');
const Post = require('./postController');
const loaders = require('./postLoader');

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

module.exports = { Post, loaders };

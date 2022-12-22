const mongoose = require('mongoose');
const config = require('../config');

require('./models');
const controllers = require('./controllers');
const loaders = require('./loaders');

if (config.nodeEnv !== 'test') {
  mongoose.set('strictQuery', true);
  mongoose.connect(config.mongo.database, config.mongo.options, err => {
    if (err) {
      console.log(`mongodb connection failed ${err}`);
    } else {
      console.log('hello from mongodb');
    }
  });
}

module.exports = () => ({ ...controllers, loaders });

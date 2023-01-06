const DataLoader = require('dataloader');
const userLoaders = require('../datasources/userLoader');

function createLoader() {
  return {
    userById: new DataLoader(userLoaders.batchUserById),
  };
}

module.exports = createLoader;

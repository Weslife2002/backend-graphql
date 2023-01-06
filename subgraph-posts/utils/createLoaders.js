const DataLoader = require('dataloader');
const postLoaders = require('../datasources/postLoader');

function createLoader() {
  return {
    postById: new DataLoader(postLoaders.batchPostById),
  };
}

module.exports = createLoader;

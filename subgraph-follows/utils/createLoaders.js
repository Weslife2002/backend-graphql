const DataLoader = require('dataloader');
const followLoaders = require('../datasources/followLoaders');

function createLoader() {
  return {
    followerCountOfUser: new DataLoader(followLoaders.batchFollowerCountOfUser),
  };
}

module.exports = createLoader;

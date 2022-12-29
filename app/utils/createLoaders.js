const DataLoader = require('dataloader');
const loaders = require('../datasources/loaders');

function createLoader() {
  return {
    deleteComment: (new DataLoader(loaders.batchDeleteComments)),
  };
}

module.exports = createLoader;

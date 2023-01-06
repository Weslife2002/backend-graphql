const DataLoader = require('dataloader');
const commnetLoaders = require('../datasources/commentLoaders');

function createLoader() {
  return {
    commentById: new DataLoader(commnetLoaders.batchCommentById),
  };
}

module.exports = createLoader;

const DataLoader = require('dataloader');
const clapLoaders = require('../datasources/clapLoaders');

function createLoader() {
  return {
    clapCountOfPost: new DataLoader(clapLoaders.batchClapCountOfPost),
  };
}

module.exports = createLoader;

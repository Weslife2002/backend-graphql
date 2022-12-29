const DataLoader = require('dataloader');
const loaders = require('../datasources/loaders');

function createLoader() {
  return {
    followerCountOfUser: new DataLoader(loaders.batchFollowerCountOfUser),
    clapCountOfPost: new DataLoader(loaders.batchClapCountOfPost),
    postById: new DataLoader(loaders.batchPostById),
    userById: new DataLoader(loaders.batchUserById),
    commentById: new DataLoader(loaders.batchCommentById),
  };
}

module.exports = createLoader;

const DataLoader = require('dataloader');
const { Clap } = require('../../models');

const loader = (new DataLoader(keys => batchDeleteComments(keys)));

async function batchDeleteComments(keys) {
  const clapCount = await Clap.aggregate([{
    $match: { post: { $in: keys } },
  }, {
    $project: { _id: 0, post: 1, count: 1 },
  }, {
    $group: {
      _id: '$post',
      clapCount: { $sum: '$count' },
    },
  },
  ]);

  const clapMap = new Map();
  clapCount.forEach(clapInstance => {
    clapMap.set(clapInstance._id.toString(), clapInstance.clapCount);
  });

  return keys.map(key => clapMap.get(key.toString()) || 0);
}

module.exports = loader;

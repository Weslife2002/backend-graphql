const DataLoader = require('dataloader');
const { Follow } = require('../../models');

const loader = (new DataLoader(keys => batchDeleteComments(keys)));

async function batchDeleteComments(keys) {
  const followerCount = await Follow.aggregate([{
    $match: { followee: { $in: keys } },
  }, {
    $project: { followee: 1 },
  }, {
    $group: {
      _id: '$followee',
      clapCount: { $sum: 1 },
    },
  },
  ]);

  const followerCountMap = new Map();
  followerCount.forEach(clapInstance => {
    followerCountMap.set(clapInstance._id.toString(), clapInstance.clapCount);
  });

  return keys.map(key => followerCountMap.get(key.toString()) || 0);
}

module.exports = loader;

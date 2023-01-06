const mongoose = require('mongoose');
const { Follow } = require('./models');

async function batchFollowerCountOfUser(keys) {
  console.log('Went here');
  const objectKeys = keys.map(key => mongoose.Types.ObjectId(key));
  const followerCount = await Follow.aggregate([{
    $match: { followee: { $in: objectKeys } },
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

module.exports = {
  batchFollowerCountOfUser,
};

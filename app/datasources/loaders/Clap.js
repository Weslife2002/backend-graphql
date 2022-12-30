const mongoose = require('mongoose');
const { Clap } = require('../models');

async function batchClapCountOfPost(keys) {
  const objectKeys = keys.map(key => mongoose.Types.ObjectId(key));
  const clapCount = await Clap.aggregate([{
    $match: { post: { $in: objectKeys } },
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

  return keys.map(key => clapMap.get(key) || 0);
}

module.exports = {
  batchClapCountOfPost,
};

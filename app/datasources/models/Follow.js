const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
    index: true,
  },
  followeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
    index: true,
  },
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;

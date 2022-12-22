const mongoose = require('mongoose');

const userShortSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  numberOfFollowers: {
    type: Number,
  },
});

const UserShort = mongoose.model('UserShort', userShortSchema);

module.exports = UserShort;

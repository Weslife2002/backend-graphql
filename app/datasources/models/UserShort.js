const mongoose = require('mongoose');
const config = require('../../config');

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
    default: config.mongoose.userDefaultValue.photoUrl,
  },
  bio: {
    type: String,
    required: true,
    default: config.mongoose.userDefaultValue.bio,
  },
  numberOfFollowers: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UserShort = mongoose.model('UserShort', userShortSchema);

module.exports = UserShort;

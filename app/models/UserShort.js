const mongoose = require('mongoose');

const userShortSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
  username: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  bio: {
    type: String,
  },
  numberOfFollowers: {
    type: Number,
  },
});

const UserShort = mongoose.model('UserShort', userShortSchema);

module.exports = {
  UserShort,
};

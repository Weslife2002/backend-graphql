const mongoose = require('mongoose');

const userShortSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: username => String(username)
        .toLowerCase()
        .match(
          /^[a-zA-Z\-0-9,.\s]+$/,
        ),
      message: props => `${props.value} is not a valid username!`,
    },
    unique: true,
    index: true,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  numberOfFollowers: {
    type: Number,
    default: 0,
    required: true,
  },
});

const UserShort = mongoose.model('UserShort', userShortSchema);

module.exports = {
  UserShort,
};

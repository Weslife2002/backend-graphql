const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
      message: props => `${props.value} is not a valid email!`,
    },
    unique: true,
    index: true,
    required: true,
  },
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
    required: true,
    index: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  photoUrl: {
    type: String,
    required: true,
    default: 'defaultPhoto.png',
  },
  newNotificationsNO: {
    type: Number,
    required: true,
    default: 0,
  },
  password: String,
  connectGoogle: Boolean,
  connectFacebook: Boolean,
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;

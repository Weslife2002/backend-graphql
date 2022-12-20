const mongoose = require('mongoose');
const { userDefaultBio, userDefaultPhotoUrl } = require('../configs');

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
  photoUrl: {
    type: String,
    required: true,
    default: userDefaultPhotoUrl,
  },
  bio: {
    type: String,
    required: true,
    default: userDefaultBio,
  },
  numberOfNewNotifications: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfFollowers: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfFollowees: {
    type: String,
    required: true,
    default: 0,
  },
  topFiveFollowees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'blog',
    required: true,
    default: [],
  },
  password: String,
  connectGoogle: Boolean,
  connectFacebook: Boolean,
  followingTopics: {
    type: [{
      type: String,
      validator: followingTopic => (
        ['defaultTopic1', 'defaultTopic2', 'defaultTopic3', 'defaultTopic4', 'defaultTopic5']
          .findIndex(availableTopic => availableTopic === followingTopic) !== -1
      ),
      message: props => `${props.value} is not an available topic!`,
      index: true,
    }],
    required: true,
    validator: followingTopic => (followingTopic.length > 2),
    message: props => `${props.value} is must have at least 3 topics!`,
    default: ['defaultTopic1', 'defaultTopic2', 'defaultTopic3'],
  },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = {
  UserAccount,
};

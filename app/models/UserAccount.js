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
    required: true,
    index: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
    default: 'defaultPhoto.png',
  },
  bio: {
    type: String,
    required: true,
    default: 'This is the the fault bio',
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

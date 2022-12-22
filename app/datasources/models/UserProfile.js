const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
    default: 'defaultPhoto.png',
  },
  bio: {
    type: String,
    required: true,
    default: 'This is the default bio',
  },
  FollowersNO: {
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

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;

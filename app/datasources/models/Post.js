const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
    index: true,
  },
  topicCluster: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  publishTime: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  estimatedReadingTime: {
    type: Number,
    required: true,
  },
  thumbnailPictureUrl: {
    type: String,
    required: true,
  },
  commentsCount: {
    type: Number,
    required: true,
    default: 0,
  },
  clapsCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

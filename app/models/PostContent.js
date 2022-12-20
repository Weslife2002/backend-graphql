const mongoose = require('mongoose');

const postContentSchema = new mongoose.Schema({
  authorEmail: {
    type: String,
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

const PostContent = mongoose.model('PostContent', postContentSchema);

module.exports = {
  PostContent,
};

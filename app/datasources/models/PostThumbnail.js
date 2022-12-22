const mongoose = require('mongoose');

const postThumbnailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserShort',
    required: true,
    index: true,
  },
  postContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
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
  estimatedReadingTime: {
    type: Number,
    required: true,
  },
  thumbnailPictureUrl: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
});

const PostThumbnail = mongoose.model('PostThumbnail', postThumbnailSchema);

module.exports = PostThumbnail;

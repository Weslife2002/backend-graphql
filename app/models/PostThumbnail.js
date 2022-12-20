const mongoose = require('mongoose');

const postThumbnailSchema = new mongoose.Schema({
  userShortId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserShort',
    required: true,
    index: true,
  },
  postContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserShort',
    required: true,
    index: true,
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
  thumbnailPicture: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
});

const PostThumbnail = mongoose.model('PostThumbnail', postThumbnailSchema);

module.exports = {
  PostThumbnail,
};

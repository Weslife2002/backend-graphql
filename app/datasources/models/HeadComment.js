const mongoose = require('mongoose');

const headCommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  clapsCount: {
    type: String,
    required: true,
    default: 0,
  },
  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'ReplyComment',
    required: true,
    default: [],
  },
});

const HeadComment = mongoose.model('HeadComment', headCommentSchema);

module.exports = HeadComment;

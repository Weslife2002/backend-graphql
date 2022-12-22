const mongoose = require('mongoose');

const replyCommentSchema = new mongoose.Schema({
  userId: {
    type: [mongoose.Schema.Types.ObjectId],
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

const Comment = mongoose.model('ReplyComment', replyCommentSchema);

module.exports = Comment;

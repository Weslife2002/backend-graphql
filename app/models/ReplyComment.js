const mongoose = require('mongoose');

const replyCommentSchema = new mongoose.Schema({
  authorEmail: {
    type: String,
    required: true,
  },
  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'ReplyComment',
    required: true,
    default: [],
  },
  content: {
    type: String,
    required: true,
  },

});

const Comment = mongoose.model('ReplyComment', replyCommentSchema);

module.exports = Comment;

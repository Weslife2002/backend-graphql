const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostContent',
    required: true,
    index: true,
  },
  userShortId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
  },
  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    required: true,
    default: [],
  },
  content: {
    type: String,
    required: true,
  },

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

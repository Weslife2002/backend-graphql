const mongoose = require('mongoose');

const headCommentSchema = new mongoose.Schema({
  postContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostContent',
    required: true,
    index: true,
  },
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

const HeadComment = mongoose.model('HeadComment', headCommentSchema);

module.exports = HeadComment;

const mongoose = require('mongoose');

const applauseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
    index: true,
  },
  numberOfClaps: Number,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    index: true,
  },
  headCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HeadComment',
    index: true,
  },
  replyCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReplyComment',
    index: true,
  },
});

const Applause = mongoose.model('Applause', applauseSchema);

module.exports = Applause;

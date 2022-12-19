const mongoose = require('mongoose');

const applauseSchema = new mongoose.Schema({
  userAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    required: true,
    index: true,
  },
  numberOfClaps: Number,
  postContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostContent',
    index: true,
  },
});

const Applause = mongoose.model('Applause', applauseSchema);

module.exports = {
  Applause,
};

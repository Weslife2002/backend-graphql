const mongoose = require('mongoose');

const applauseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  numberOfClaps: Number,
  postContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostContent',
    required: true,
    index: true,
  },
});

const Applause = mongoose.model('Applause', applauseSchema);

module.exports = Applause;

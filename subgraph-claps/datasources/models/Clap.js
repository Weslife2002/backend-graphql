const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const Clap = new mongoose.Schema({
  user: { type: ObjectId, required: true },
  post: { type: ObjectId },
  postOwner: { type: ObjectId },
  comment: { type: ObjectId },

  count: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Clap', Clap);

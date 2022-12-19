const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
  Admin,
};

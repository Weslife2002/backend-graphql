require('dotenv').config();

module.exports = {
  userDefaultValue: {
    bio: process.env.USER_DEFAULT_BIO,
    photoUrl: process.env.USER_DEFAULT_PHOTO_URL,
  },
};

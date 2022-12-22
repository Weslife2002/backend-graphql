require('dotenv').config();

module.exports = {
  emailHost: process.env.EMAIL_HOST,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailService: process.env.EMAIL_SERVICE,
};

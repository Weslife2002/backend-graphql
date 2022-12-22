require('dotenv').config();

module.exports = {
  sessionTimeOut: Number(process.env.SESSION_TIME_OUT),
};

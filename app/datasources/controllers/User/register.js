const crypto = require('crypto');
const UAParser = require('ua-parser-js');
const { User } = require('../../models');
const cacheUser = require('../../utils/account/cacheUser');

module.exports = async ({ email, username, password }, { req }) => {
  const userAgent = UAParser(req.headers['user-agent']);
  const token = crypto
    .randomBytes(12)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const newUser = await User.create({ email, username, password }).then(
    userInstance => userInstance.save().then(
      savedUser => savedUser,
    ),
  );
  cacheUser(username, token, userAgent, {
    username,
    role: newUser.role,
  });
  return { newUser, token };
};

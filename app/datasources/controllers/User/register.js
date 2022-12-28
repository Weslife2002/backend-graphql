const crypto = require('crypto');
const { User } = require('../../models');
const cacheUser = require('../../utils/redis/cacheUser');

module.exports = async ({ email, username, password }) => {
  const randomString = crypto
    .randomBytes(12)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const newUser = await User.create({ email, username, password }).then(
    userInstance => userInstance.save(),
  );
  const token = `${newUser._id}:${randomString}`;
  cacheUser(`${newUser._id}:${randomString}`, newUser.role);
  return { newUser, token };
};

const crypto = require('crypto');
const clearUserCache = require('../../utils/redis/clearUserCache');
const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const redisClient = require('../../utils/redis/redisClient');
const config = require('../../../config');

async function disableUser(args, context, info) {
  const { id } = args;
  await User.updateOne({ _id: id }, { status: 'Deactivated' });
  clearUserCache(id);
}

async function find(args, context, info) {
  const { _id } = args;
  const selectedFields = getSelectedFields(info);
  const user = await User.findOne({ _id }).select(selectedFields).lean();
  return user;
}

async function login(args, context, info) {
  const { username, password } = args;
  const selectedFields = getSelectedFields(info, { additionalFields: ['_id', 'role', 'status'], recursive: true, lastOnly: true });
  const user = await User.findOne({
    username, password, status: 'Activated',
  }).select(selectedFields).lean();
  if (!user) {
    return {
      isSuccess: false,
      message: 'Invalid credentials!',
    };
  }
  const randomString = crypto.randomBytes(12).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const token = `${user._id}:${randomString}`;
  redisClient.set(token, user.role, 'PX', config.session.sessionTimeOut);
  return {
    isSuccess: true,
    message: 'Authentication success!',
    user,
    token,
  };
}

async function logout(args, context, info) {
  const { credential } = context;
  const { token } = credential;
  await redisClient.del(token);
  return {
    isSuccess: true,
    message: 'Log out success!',
  };
}

async function me(args, context, info) {
  const selectedFields = getSelectedFields(info, { lastOnly: true });
  const { credentials } = context;
  const { _id } = credentials;
  return User.findOne({ _id }).select(selectedFields);
}

const register = require('./register');
const user = require('./user');
const users = require('./users');

module.exports = {
  disableUser,
  find,
  login,
  logout,
  me,
  register,
  user,
  users,
};

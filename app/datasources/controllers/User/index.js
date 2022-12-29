/* eslint-disable no-shadow */
const crypto = require('crypto');
const clearUserCache = require('../../utils/redis/clearUserCache');
const { User } = require('../../models');
const getSelectedFields = require('../../utils/general/getSelectedFields');
const redisClient = require('../../utils/redis/redisClient');
const config = require('../../../config');

async function disableUser(args, context, info) {
  try {
    const { id } = args;
    await Promise.all([
      User.updateOne({ _id: id }, { status: 'Deactivated' }),
      clearUserCache(id),
    ]);
    return {
      isSuccess: true,
      message: 'Disable user success!',
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      isSuccess: true,
      message: error.message,
    };
  }
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
    message: 'Logout success!',
  };
}

async function me(args, context, info) {
  const selectedFields = getSelectedFields(info, { lastOnly: true });
  const { credentials } = context;
  const { _id } = credentials;
  return User.findOne({ _id }).select(selectedFields);
}

async function register(args, context, info) {
  const { email, username, password } = args;
  const newUser = await User.create({ email, username, password }).then(
    userInstance => userInstance.save(),
  );
  return {
    isSuccess: true,
    message: 'Register Success!',
    newUser,
  };
}

async function userFilter(args, context, info) {
  // FIXME: Get Specific Filter Input
  const { input } = args;
  const user = await User.findOne({ ...input }).select(
    getSelectedFields(info, { lastOnly: true }),
  );
  return user;
}

async function users(args, context, info) {
  const { username } = args;
  const selectedFields = getSelectedFields(info, { lastOnly: true });
  const users = await User.find({ username }).select(selectedFields);
  return users;
}

module.exports = {
  disableUser,
  find,
  login,
  logout,
  me,
  register,
  user: userFilter,
  users,
};

const crypto = require('crypto');
const UAParser = require('ua-parser-js');
const { GraphQLError } = require('graphql');
const { User } = require('../../models');
const cacheUser = require('../../utils/redis/cacheUser');

const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({ username, password }, { req }, info) => {
  const userAgent = UAParser(req.headers['user-agent']);
  const token = crypto.randomBytes(12).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const user = await User.findOne({ username, password }).select(
    getSelectedFields(info, { additionalFields: ['_id', 'role', 'status'], recursive: true, lastOnly: true }),
  );
  if (!user) {
    throw new GraphQLError('Wrong username or password.');
  }
  if (user.status === 'Deactivated') {
    throw new GraphQLError('Your account has been ban.');
  }
  cacheUser(user._id, token, userAgent, {
    id: user._id,
    role: user.role,
  });
  return { user, token };
};

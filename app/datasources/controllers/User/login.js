const crypto = require('crypto');
const { GraphQLError } = require('graphql');
const UAParser = require('ua-parser-js');
const { User } = require('../../models');
const cacheUser = require('../../utils/account/cacheUser');

const getSelectedFields = require('../../utils/general/getSelectedFields');

module.exports = async ({ username, password }, { req }, info) => {
  const userAgent = UAParser(req.headers['user-agent']);
  const token = crypto
    .randomBytes(12)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const user = await User.findOne({ username, password }).select(
    getSelectedFields(info, { additionalFields: ['role'], recursive: true, lastOnly: true }),
  );
  if (!user) {
    throw new GraphQLError('Wrong username or password');
  }
  cacheUser(username, token, userAgent, {
    username,
    role: user.role,
  });
  return { user, token };
};

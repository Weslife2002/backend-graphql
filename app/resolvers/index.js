const Scalar = require('./Scalar');
const Query = require('./queryResolver');
const Mutation = require('./mutationResolver');
const User = require('./User');
const Clap = require('./Clap');
const Post = require('./Post');

const resolvers = {
  ...Scalar,
  Query,
  Mutation,
  User,
  Clap,
  Post,

};

module.exports = resolvers;

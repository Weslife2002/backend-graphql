const Scalar = require('./Scalar');
const Query = require('./queryResolver');
const Mutation = require('./mutationResolver');
const User = require('./User');
const Clap = require('./Clap');
const Post = require('./Post');
const Comment = require('./Comment');

const resolvers = {
  ...Scalar,
  Query,
  Mutation,
  User,
  Clap,
  Post,
  Comment,

};

module.exports = resolvers;

const post = require('./post');
const posts = require('./posts');
const deletePost = require('./deletePost');
const createPost = require('./createPost');
const hidePost = require('./hidePost');
const updatePost = require('./updatePost');
const clapCount = require('../Clap/clapCount');

module.exports = {
  post,
  posts,
  deletePost,
  createPost,
  hidePost,
  updatePost,
  clapCount,
};

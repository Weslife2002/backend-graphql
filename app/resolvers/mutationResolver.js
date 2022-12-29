function registerResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.register(args, context, info);
}
function loginResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.login(args, context, info);
}
function logoutResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.logout(args, context, info);
}
function disableUserResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.disableUser(args, context, info);
}

function followResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Follow.follow(args, context, info);
}
function unfollowResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Follow.unfollow(args, context, info);
}

function createPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.createPost(args, context, info);
}
function updatePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.updatePost(args, context, info);
}
function deletePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.deletePost(args, context, info);
}
function hidePostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.hidePost(args, context, info);
}

function clapPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.clapPost(args, context, info);
}
function unclapPostResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.unclapPost(args, context, info);
}
function clapCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.clapComment(args, context, info);
}
function unclapCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Clap.unclapComment(args, context, info);
}

function commentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.comment(args, context, info);
}
function updateCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.updateComment(args, context, info);
}
function replyResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.reply(args, context, info);
}
function deleteCommentResolver(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.deleteComment(args, context, info);
}

module.exports = {
  register: registerResolver,
  login: loginResolver,
  logout: logoutResolver,
  disableUser: disableUserResolver,

  follow: followResolver,
  unfollow: unfollowResolver,

  createPost: createPostResolver,
  updatePost: updatePostResolver,
  deletePost: deletePostResolver,
  hidePost: hidePostResolver,

  clapPost: clapPostResolver,
  unclapPost: unclapPostResolver,
  clapComment: clapCommentResolver,
  unclapComment: unclapCommentResolver,

  comment: commentResolver,
  updateComment: updateCommentResolver,
  reply: replyResolver,
  deleteComment: deleteCommentResolver,
};

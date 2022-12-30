function me(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.me(args, context, info);
}

function user(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.user(args, context, info);
}

function users(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.User.users(args, context, info);
}

function post(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.post(args, context, info);
}

function posts(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Post.posts(args, context, info);
}

function replies(parent, args, context, info) {
  const { dataSources } = context;
  return dataSources.Comment.replies(args, context, info);
}

module.exports = {
  me,
  user,
  users,
  post,
  posts,
  replies,
};

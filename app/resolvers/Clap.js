function commentResolver(parent, args, context, info) {
  const { comment } = parent;
  const { loaders } = context;
  return loaders.commentById.load(comment);
}

function postResolver(parent, args, context, info) {
  const { post } = parent;
  const { loaders } = context;
  return loaders.postById.load(post);
}

function userResolver(parent, args, context, info) {
  const { user } = parent;
  const { loaders } = context;
  return loaders.userById.load(user);
}

module.exports = {
  comment: commentResolver,
  post: postResolver,
  user: userResolver,
};

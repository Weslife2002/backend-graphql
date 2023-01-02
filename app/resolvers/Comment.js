function postResolver(parent, args, context, info) {
  const { post } = parent;
  const { loaders } = context;
  return loaders.postById.load(post.toString());
}

function userResolver(parent, args, context, info) {
  const { user } = parent;
  const { loaders } = context;
  return loaders.userById.load(user.toString());
}

module.exports = {
  post: postResolver,
  user: userResolver,
};

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
  post: postResolver,
  user: userResolver,
};

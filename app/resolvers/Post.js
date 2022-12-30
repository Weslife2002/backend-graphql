function clapCountResolver(parent, args, context, info) {
  const { _id } = parent;
  const { loaders } = context;
  return loaders.clapCountOfPost.load(_id.toString());
}

function ownerResolver(parent, args, context, info) {
  const { owner } = parent;
  const { loaders } = context;
  return loaders.userById.load(owner.toString());
}

module.exports = {
  clapCount: clapCountResolver,
  owner: ownerResolver,
};

function clapCountResolver(parent, args, context, info) {
  const { _id } = parent;
  const { loaders } = context;
  return loaders.clapCountOfPost.load(_id);
}

function ownerResolver(parent, args, context, info) {
  const { owner } = parent;
  const { loaders } = context;
  return loaders.clapCountOfPost.load(owner);
}

module.exports = {
  clapCount: clapCountResolver,
  owner: ownerResolver,
};

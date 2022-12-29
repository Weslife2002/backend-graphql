async function followerCountResolver(parent, args, context, info) {
  const { _id } = parent;
  const { loaders } = context;
  return loaders.followerCountOfUser.load(_id);
}

module.exports = {
  followerCount: followerCountResolver,
};

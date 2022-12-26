const getUserId = require('../../utils/redis/getUserId');
const { Post } = require('../../models');

module.exports = async (title, content, status, token) => {
  const owner = await getUserId(token);
  return (Post.create(
    { title, content, status, owner },
  ).then(postInstance => postInstance.save()));
};

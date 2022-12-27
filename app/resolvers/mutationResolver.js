require('../global');
const { GraphQLError } = require('graphql');
const responseMessage = require('../utils/responseMessage');

module.exports = {
  register: async (_, { email, username, password }, { dataSources, req }, ___) => {
    try {
      const { newUser, token } = await dataSources.User.register({ email, username, password }, { req });
      return responseMessage(true, 'Register successfully', { newUser, token });
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  login: async (_, { username, password }, { dataSources, req }, info) => {
    try {
      const { user, token } = await dataSources.User.login(
        { username, password },
        { req },
        info,
      );
      return responseMessage(true, 'Authentication successfully', { user, token });
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  disableUser: async (_, { id }, { dataSources }) => {
    try {
      await dataSources.User.disableUser(id);
      return responseMessage(true, 'Disable user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  follow: async (_, { followee }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Follow.follow(followee, token);
      return responseMessage(true, 'Follow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unfollow: async (_, { followee }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Follow.unfollow(followee, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  createPost: async (_, { title, content, status }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const post = await dataSources.Post.createPost(title, content, status, token);
      return post;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  updatePost: async (_, { input }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return await dataSources.Post.updatePost(input, token, info);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  deletePost: async (_, { _id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.deletePost(_id, token);
      return responseMessage(true, 'Delete post successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  hidePost: async (_, { _id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.hidePost(_id, token);
      return responseMessage(true, 'Hide post successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  clapPost: async (_, { postId, count = 1 }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Clap.clapPost({ postId, count }, token);
      return responseMessage(true, 'Clap post successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unclapPost: async (_, { postId }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Clap.unclapPost(postId, token);
      return responseMessage(true, 'Unclap post successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  clapComment: async (_, { commentId, count = 1 }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Clap.clapComment({ commentId, count }, token);
      return responseMessage(true, 'Clap comment successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unclapComment: async (_, { commentId }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Clap.unclapComment(commentId, token);
      return responseMessage(true, 'Unclap comment successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  comment: async (_, { input }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return (await dataSources.Comment.comment(input, token));
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  updateComment: async (_, { input }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return (await dataSources.Comment.updateComment(input, token, info));
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  reply: async (_, { input }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return (await dataSources.Comment.reply(input, token));
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  deleteComment: async (_, { _id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Comment.deleteComment(
        _id,
        token,
        dataSources.loaders.Comment.deleteComment,
      );
      return responseMessage(true, 'Delete comment successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
};

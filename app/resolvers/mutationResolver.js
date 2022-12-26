require('../global');
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
  follow: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Follow.follow(id, token);
      return responseMessage(true, 'Follow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unfollow: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Follow.unfollow(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  createPost: async (_, { title, content, status }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.createPost(title, content, status, token, info);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  updatePost: async (_, { id }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  deletePost: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  hidePost: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  clapPost: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unclapPost: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  clapComment: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  unclapComment: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

  comment: async (_, { id }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  updateComment: async (_, { id }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  reply: async (_, { id }, { dataSources, req }, info) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },
  deleteComment: async (_, { id }, { dataSources, req }) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await dataSources.Post.updatePost(id, token);
      return responseMessage(true, 'Unfollow user successfully');
    } catch (error) {
      return responseMessage(false, error.message);
    }
  },

};

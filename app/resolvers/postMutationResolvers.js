module.exports = {
  // createPost: async (_, {
  //   topicCluster,
  //   tags,
  //   estimatedReadingTime,
  //   thumbnailPictureUrl,
  //   shortDescription,
  //   content,
  // }, { req }, __info) => {
  //   try {
  //     if (req.session.user && req.session.user.email) {
  //       const authorEmail = req.session.user.email;
  //       const newPostContents = await PostContent.insertMany([{
  //         authorEmail,
  //         topicCluster,
  //         tags,
  //         estimatedReadingTime,
  //         thumbnailPictureUrl,
  //         shortDescription,
  //         content,
  //       }]);
  //       const newPostContent = newPostContents[0];
  //       const { _id: postContentId, publishTime } = newPostContent;
  //       await PostThumbnail.insertMany([{
  //         postContentId,
  //         authorEmail,
  //         topicCluster,
  //         tags,
  //         publishTime,
  //         estimatedReadingTime,
  //         thumbnailPictureUrl,
  //         shortDescription,
  //       }]);
  //       return responseMessage(200, true, 'Create new post successfully!', { post: {
  //         postContentId,
  //         authorEmail,
  //         topicCluster,
  //         tags,
  //         publishTime,
  //         estimatedReadingTime,
  //         thumbnailPictureUrl,
  //         shortDescription,
  //       } });
  //     }
  //     return responseMessage(403, false, 'Fail to create new post!', { error: {
  //       name: 'Unauthorized',
  //       message: 'You must login to create new post!',
  //     } });
  //   } catch (error) {
  //     logger.error(JSON.stringify({ errorMessage: error.message, errorName: error.name }));
  //     return responseMessage(500, false, 'Internal Server Error!', { error: {
  //       message: error.message,
  //       name: error.name,
  //     } });
  //   }
  // },
};

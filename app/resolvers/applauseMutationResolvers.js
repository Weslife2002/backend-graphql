module.exports = {
  // applausePost: async (_, { postContentId }, { req }) => {
  //   try {
  //     if (!req.session.user || !req.session.user.email) {
  //       return responseMessage(403, false, 'Applause failed!', { error: {
  //         name: 'Unauthorized!',
  //         message: 'You must login to applause the post',
  //       } });
  //     }
  //     const applauseInstance = await Applause.findOne({
  //       email: req.session.user.email,
  //       postContentId,
  //     });
  //     if (applauseInstance) {
  //       await Applause.updateOne({
  //         email: req.session.user.email,
  //         postContentId,
  //       }, { $inc: { numberOfClaps: 1 } });
  //     } else {
  //       await Applause.insertMany([{
  //         email: req.session.user.email,
  //         postContentId,
  //         numberOfClaps: 1,
  //       }]);
  //     }
  //     return responseMessage(200, true, 'Applause success!');
  //   } catch (error) {
  //     return responseMessage(500, false, '', { error: {
  //       name: error.name,
  //       message: error.message,
  //     } });
  //   }
  // },
  // unApplausePost: async (_, { postContentId }, { req }) => {
  //   try {
  //     if (!req.session.user || !req.session.user.email) {
  //       return responseMessage(403, false, 'Applause failed!', { error: {
  //         name: 'Unauthorized!',
  //         message: 'You must login to unapplause the post',
  //       } });
  //     }
  //     await Applause.deleteMany({
  //       email: req.session.user.email,
  //       postContentId,
  //     });
  //     return responseMessage(200, true, 'Unapplause success!');
  //   } catch (error) {
  //     return responseMessage(500, false, '', { error: {
  //       name: error.name,
  //       message: error.message,
  //     } });
  //   }
  // },
};

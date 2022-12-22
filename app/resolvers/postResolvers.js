module.exports = {
  // CreatePostResponse: {
  //   __resolveType({ post, error }) {
  //     if (post) {
  //       return 'CreatePostSuccessResponse';
  //     }
  //     if (error) {
  //       return 'ErrorReponse';
  //     }
  //     return null;
  //   },
  // },
  // PostThumbnail: {
  //   author: async ({ authorEmail }, _, __, info) => {
  //     const rawSelectedFieldMap = new Map();
  //     rawSelectedFieldMap.set('username', 'username');
  //     rawSelectedFieldMap.set('email', 'email');
  //     rawSelectedFieldMap.set('photoUrl', 'photoUrl');
  //     rawSelectedFieldMap.set('bio', 'bio');
  //     rawSelectedFieldMap.set('numberOfFollowers', 'numberOfFollowers');

  //     const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);

  //     const selectedFields = rawSelectedFields.map(
  //       rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
  //     );
  //     const foundUserShort = await UserShort.findOne({ email: authorEmail }).select(selectedFields);
  //     return foundUserShort;
  //   },
  // },
  // Post: {
  //   author: async ({ authorEmail }, _, __, info) => {
  //     const rawSelectedFieldMap = new Map();
  //     rawSelectedFieldMap.set('username', 'username');
  //     rawSelectedFieldMap.set('email', 'email');
  //     rawSelectedFieldMap.set('photoUrl', 'photoUrl');
  //     rawSelectedFieldMap.set('bio', 'bio');
  //     rawSelectedFieldMap.set('numberOfFollowers', 'numberOfFollowers');

  //     const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);

  //     const selectedFields = rawSelectedFields.map(
  //       rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
  //     );
  //     const foundUserShort = await UserShort.findOne({ email: authorEmail }).select(selectedFields);
  //     return foundUserShort;
  //   },
  //   applaused: async ({ _id }, _, { req }) => {
  //     if (!req.session.user || !req.session.user.email) {
  //       return false;
  //     }
  //     const applauseRecord = await Applause.findOne({
  //       email: req.session.user.email,
  //       _id,
  //     });
  //     if (!applauseRecord) {
  //       return false;
  //     }
  //     return true;
  //   },
  // },
};

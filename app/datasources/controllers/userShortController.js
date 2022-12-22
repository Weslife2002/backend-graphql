const userShortFieldMap = new Map();
userShortFieldMap.set('username', 'username');
userShortFieldMap.set('photoUrl', 'photoUrl');
userShortFieldMap.set('bio', 'bio');
userShortFieldMap.set('numberOfFollowers', 'numberOfFollowers');

module.exports = {
  findUserShortByEmail: async ({ email }, _, info) => {
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    const selectedFields = rawSelectedFields.map(
      rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
    ).concat('email');
    const foundUserShort = await UserShort.findOne({ email }).select(selectedFields);
    return foundUserShort;
  },
};

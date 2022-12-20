const getRawSelectedFields = require('../utils/otherUtils/getRawSelectedFields');
const { UserShort } = require('../models');

module.exports = {
  findUserShortByEmail: async (_, { email }, __, info) => {
    const rawSelectedFieldMap = new Map();
    rawSelectedFieldMap.set('username', 'username');
    rawSelectedFieldMap.set('numberOfFollowers', 'numberOfFollowers');
    rawSelectedFieldMap.set('photoUrl', 'photoUrl');
    rawSelectedFieldMap.set('bio', 'bio');
    const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
    const selectedFields = rawSelectedFields.map(
      rawSelectedField => rawSelectedFieldMap.get(rawSelectedField),
    ).concat('email');
    console.log({ selectedFields });
    const foundUserShort = await UserShort.findOne({ email }).select(selectedFields);
    console.log({ foundUserShort });
    return foundUserShort;
  },
};

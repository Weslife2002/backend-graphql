const { UserShort } = require('../../models');
const getRawSelectedFields = require('../../utils/otherUtils/getRawSelectedFields');

module.exports = async ({ userId }, _, info) => {
  console.log({ abc: info.fieldNodes });
  const rawSelectedFields = getRawSelectedFields(info.fieldNodes[0].selectionSet);
  const foundUserShort = await UserShort.findOne({ userId }).select(rawSelectedFields);
  return foundUserShort;
};

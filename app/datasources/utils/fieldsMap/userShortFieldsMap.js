module.exports = rawSelectedFields => {
  const userShortRawFieldsMap = new Map();
  userShortRawFieldsMap.set('username', 'username');
  userShortRawFieldsMap.set('photoUrl', 'photoUrl');
  userShortRawFieldsMap.set('bio', 'bio');
  userShortRawFieldsMap.set('numberOfFollowers', 'numberOfFollowers');
  rawSelectedFields.findIndex(rawSelectedField => rawSelectedField.match(/a/));
};

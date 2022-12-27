module.exports = object => {
  const newEntries = Object.entries(object).filter(
    ([_, value]) => value !== undefined,
  );
  const newObject = Object.fromEntries(newEntries);
  return newObject;
};

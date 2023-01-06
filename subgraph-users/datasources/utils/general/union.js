function union() {
  // eslint-disable-next-line prefer-rest-params
  const args = [...arguments];
  return args.reduce(
    (rootArray, nextArray) => [...new Set([...rootArray, ...nextArray])],
  );
}

module.exports = union;

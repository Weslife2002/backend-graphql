function intersection() {
  // eslint-disable-next-line prefer-rest-params
  const args = [...arguments];
  return args.reduce(
    (rootArray, nextArray) => rootArray.filter(
      element => nextArray.includes(element),
    ),
  );
}

module.exports = intersection;

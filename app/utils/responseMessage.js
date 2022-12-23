function responseMessage(isSuccess, message, returnObject) {
  return {
    isSuccess,
    message,
    ...returnObject,
  };
}

module.exports = responseMessage;

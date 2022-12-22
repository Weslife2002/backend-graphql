function responseMessage(code, success, message, returnObject) {
  return {
    code,
    success,
    message,
    ...returnObject,
  };
}

module.exports = responseMessage;

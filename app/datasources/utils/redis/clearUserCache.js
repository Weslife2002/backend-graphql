const redisClient = require('./redisClient');

module.exports = async id => {
  const tokenList = await redisClient.lrange(id, 0, -1);
  const deleteCommands = tokenList.map(token => redisClient.del(token));
  deleteCommands.push(redisClient.del(id));
};

const redisClient = require('./redisClient');

module.exports = async id => {
  let cursor = 0;
  let keys = [];
  do {
    [cursor, keys] = redisClient.scan(cursor, `${id}:*`);
    redisClient.del(keys);
  } while (cursor !== 0);
};

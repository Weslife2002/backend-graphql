const redisClient = require('./redisClient');

module.exports = async id => {
  let cursor = 0;
  let keys = [];
  do {
    [cursor, keys] = redisClient.scan(cursor, `${id}:*`);
    keys.forEach(key => {
      redisClient.del(key);
    });
    console.log(cursor);
    console.log(keys);
  } while (cursor !== 0);
};

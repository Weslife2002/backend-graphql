const redisClient = require('./redisClient');

module.exports = async id => {
  let cursor = 0;
  let keys = [];
  do {
    [cursor, keys] = await redisClient.scan(cursor, 'MATCH', `${id}:*`, 'COUNT', '100');
    console.log({ cursor, keys });
    redisClient.del(keys);
  } while (cursor !== '0');
};

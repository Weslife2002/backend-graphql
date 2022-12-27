const redisClient = require('../../utils/redis/redisClient');

module.exports = token => redisClient.del(token);
